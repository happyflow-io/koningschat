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

// Use Bun's built-in server instead of @hono/node-server
export default {
  port,
  fetch: app.fetch,
}
