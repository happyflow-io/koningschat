# Koningschat

RAG-based chatbot voor Koningsspelen website content.

## Tech Stack

**Frontend:**
- Vue 3 + TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Express.js + TypeScript
- OpenAI API
- Pinecone/ChromaDB (Vector DB)

## Project Structure

```
koningschat/
├── frontend/          # Vue3 application
├── backend/           # Express.js API
├── docs/             # Documentation
└── README.md
```

## Development

1. **Backend setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
