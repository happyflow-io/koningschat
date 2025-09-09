# Koningschat Backend

Express.js + TypeScript API server voor RAG chatbot.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /health` - Health check
- `POST /api/chat` - Chat with RAG system

## Development

Server runs on http://localhost:3001
