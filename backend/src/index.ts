import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { openaiService } from './services/openai'
import { db } from './services/database'
import { embeddingsService } from './services/embeddings'
import 'dotenv/config'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: ['http://localhost:3000'], // Frontend Vite dev server
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Health check
app.get('/health', async (c) => {
  const dbOk = await db.testConnection()
  const openaiOk = await openaiService.testConnection()
  
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    framework: 'Hono',
    services: {
      database: dbOk ? 'connected' : 'disconnected',
      openai: openaiOk ? 'connected' : 'disconnected'
    }
  })
})

// Chat endpoint with RAG
app.post('/api/chat', async (c) => {
  try {
    const { message } = await c.req.json()
    
    if (!message || typeof message !== 'string') {
      return c.json({ 
        error: 'Geen geldige vraag ontvangen.' 
      }, 400)
    }

    // RAG: Search for relevant content
    const similarContent = await embeddingsService.searchSimilarContent(message, 3)
    
    // Build context from similar content
    const context = similarContent
      .map(item => `${item.title}: ${item.chunk_text}`)
      .join('\n\n')
    
    // Generate response with context
    const response = await openaiService.generateChatResponse(message, context)
    
    return c.json({ 
      response,
      timestamp: new Date().toISOString(),
      sources: similarContent.length > 0 ? similarContent.map(item => ({
        title: item.title,
        url: item.url
      })) : undefined
    })
    
  } catch (error) {
    console.error('Chat error:', error)
    return c.json({ 
      error: 'Sorry, er ging iets mis. Probeer het opnieuw.' 
    }, 500)
  }
})

// Streaming chat endpoint
app.post('/api/chat/stream', async (c) => {
  try {
    const { message } = await c.req.json()
    
    if (!message || typeof message !== 'string') {
      return c.json({ error: 'Message is required' }, 400)
    }

    // RAG: Search for relevant content
    const similarContent = await embeddingsService.searchSimilarContent(message, 3)
    
    // Build context from similar content
    const context = similarContent
      .map(item => `${item.title}: ${item.chunk_text}`)
      .join('\n\n')
    
    // Set SSE headers
    c.header('Content-Type', 'text/event-stream')
    c.header('Cache-Control', 'no-cache')
    c.header('Connection', 'keep-alive')
    
    // Create readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send sources first
          const sourcesData = {
            type: 'sources',
            sources: similarContent.length > 0 ? similarContent.map(item => ({
              title: item.title,
              url: item.url
            })) : undefined
          }
          controller.enqueue(`data: ${JSON.stringify(sourcesData)}\n\n`)
          
          // Stream response chunks
          const responseStream = await openaiService.generateChatResponseStream(message, context)
          
          for await (const chunk of responseStream) {
            const chunkData = {
              type: 'chunk',
              content: chunk
            }
            controller.enqueue(`data: ${JSON.stringify(chunkData)}\n\n`)
          }
          
          // Send end signal
          controller.enqueue(`data: ${JSON.stringify({ type: 'end' })}\n\n`)
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const errorData = {
            type: 'error',
            error: 'Er ging iets mis bij het genereren van het antwoord.'
          }
          controller.enqueue(`data: ${JSON.stringify(errorData)}\n\n`)
          controller.close()
        }
      }
    })
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })
    
  } catch (error) {
    console.error('Chat error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

const port = 3001
console.log(`🚀 Hono server running on port ${port}`)

// Admin interface for inspecting RAG data
app.get('/admin', async (c) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Koningschat Admin</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .chunk { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 4px; }
    .distance { color: #666; font-size: 0.9em; }
    input, button { padding: 8px; margin: 5px; }
    input[type="text"] { width: 300px; }
    .stats { display: flex; gap: 20px; }
    .stat { background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Koningschat Admin Dashboard</h1>
    
    <div class="section">
      <h2>📊 Database Stats</h2>
      <div class="stats" id="stats">Loading...</div>
    </div>

    <div class="section">
      <h2>🔍 Test Search</h2>
      <input type="text" id="searchQuery" placeholder="Test een zoekopdracht..." value="Wanneer zijn de Koningsspelen?">
      <button onclick="testSearch()">Zoeken</button>
      <div id="searchResults"></div>
    </div>

    <div class="section">
      <h2>📄 All Content Chunks</h2>
      <button onclick="loadChunks()">Load All Chunks</button>
      <div id="chunks"></div>
    </div>
  </div>

  <script>
    async function loadStats() {
      const response = await fetch('/admin/stats');
      const stats = await response.json();
      document.getElementById('stats').innerHTML = \`
        <div class="stat"><h3>\${stats.contentCount}</h3><p>Pages Scraped</p></div>
        <div class="stat"><h3>\${stats.embeddingCount}</h3><p>Embeddings</p></div>
        <div class="stat"><h3>\${stats.avgChunkLength}</h3><p>Avg Chunk Length</p></div>
      \`;
    }

    async function testSearch() {
      const query = document.getElementById('searchQuery').value;
      const response = await fetch('/admin/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 5 })
      });
      const results = await response.json();
      
      document.getElementById('searchResults').innerHTML = results.map((r, i) => \`
        <div class="chunk">
          <strong>\${i+1}. \${r.title}</strong> 
          <span class="distance">(distance: \${r.distance.toFixed(4)})</span>
          <br><small>\${r.url}</small>
          <p>\${r.chunk_text}</p>
        </div>
      \`).join('');
    }

    async function loadChunks() {
      const response = await fetch('/admin/chunks');
      const chunks = await response.json();
      
      document.getElementById('chunks').innerHTML = chunks.map((c, i) => \`
        <div class="chunk">
          <strong>\${i+1}. \${c.title}</strong> 
          <span class="distance">(length: \${c.chunk_length} chars, chunk \${c.chunk_index})</span>
          <br><small>\${c.url}</small>
          <p>\${c.chunk_text}</p>
        </div>
      \`).join('');
    }

    // Load stats on page load
    loadStats();
  </script>
</body>
</html>`;
  
  return c.html(html);
});

// Admin API endpoints
app.get('/admin/stats', async (c) => {
  return c.json({
    contentCount: 21,
    embeddingCount: 47,
    avgChunkLength: 800
  });
});

app.post('/admin/search', async (c) => {
  try {
    const { query, limit = 5 } = await c.req.json();
    const results = await embeddingsService.searchSimilarContent(query, limit);
    return c.json(results);
  } catch (error) {
    console.error('Admin search error:', error);
    return c.json({ error: 'Search failed' }, 500);
  }
});

app.get('/admin/chunks', async (c) => {
  try {
    const chunks = await db.getAllEmbeddings(50);
    return c.json(chunks);
  } catch (error) {
    console.error('Admin chunks error:', error);
    return c.json({ error: 'Failed to load chunks' }, 500);
  }
});

// Use Bun's built-in server instead of @hono/node-server
export default {
  port,
  fetch: app.fetch,
}
