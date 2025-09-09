# Koningschat

RAG-based chatbot widget voor Koningsspelen website content.

## Tech Stack

**Frontend (Widget):**
- Vue 3 + TypeScript
- TailwindCSS
- Vite

**Backend (API):**
- Hono + TypeScript
- Bun (runtime)
- OpenAI API (GPT-4 + Embeddings)

**Database:**
- PostgreSQL + pgvector (RAG embeddings)

**Deployment:**
- AWS Lambda (Hono API)
- AWS RDS (PostgreSQL)
- Docker

## Project Structure

```
koningschat/
├── frontend/          # Vue 3 widget
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatWidget.vue
│   │   ├── composables/
│   │   │   └── useChat.ts
│   │   └── main.ts
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Hono API
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   ├── openai.ts
│   │   │   └── embeddings.ts
│   │   ├── db/
│   │   │   └── schema.sql
│   │   └── index.ts
│   ├── package.json
│   └── Dockerfile
├── docs/             # Documentation
└── README.md
```

## Development

1. **Backend setup:**
   ```bash
   cd backend
   bun install
   bun run dev
   ```

2. **Frontend setup:**
   ```bash
   cd frontend
   bun install
   bun run dev
   ```

## Deployment

- Frontend: Vercel/Netlify
- Backend: AWS Lambda (via Serverless Framework)
- Database: AWS RDS PostgreSQL + pgvector
