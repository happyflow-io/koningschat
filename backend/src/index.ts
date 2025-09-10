import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { openaiService } from './services/openai'
import { db } from './services/database'
import 'dotenv/config'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add Vite dev server
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

// Chat endpoint with OpenAI
app.post('/api/chat', async (c) => {
  try {
    const { message } = await c.req.json()
    
    if (!message || typeof message !== 'string') {
      return c.json({ 
        error: 'Geen geldige vraag ontvangen.' 
      }, 400)
    }

    // For now, generate response without RAG context
    // TODO: Add vector search for relevant content
    const response = await openaiService.generateChatResponse(message)
    
    return c.json({ 
      response,
      timestamp: new Date().toISOString()
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
