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

const port = 3001
console.log(`🚀 Hono server running on port ${port}`)

// Use Bun's built-in server instead of @hono/node-server
export default {
  port,
  fetch: app.fetch,
}
