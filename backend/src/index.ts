import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Routes
app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    framework: 'Hono'
  })
})

app.post('/api/chat', async (c) => {
  const { message } = await c.req.json()
  
  // TODO: Implement RAG logic
  return c.json({ 
    response: `Je vroeg: "${message}". RAG functionaliteit komt binnenkort!`,
    timestamp: new Date().toISOString()
  })
})

const port = 3001
console.log(`🚀 Hono server running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
