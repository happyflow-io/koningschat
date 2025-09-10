# Koningschat

RAG-based chatbot widget for Koningsspelen website content.

## Quick Start

```bash
# Install all dependencies
bun run install:all

# Start development servers (backend + frontend)
bun run dev
```

Open http://localhost:5173 to see the chat widget demo.

## Development Scripts

```bash
bun run dev              # Start both backend and frontend
bun run dev:backend      # Start only backend (port 3001)
bun run dev:frontend     # Start only frontend (port 5173)
bun run health           # Check API health status
bun run scrape           # Run website content scraper
bun run build            # Build for production
```

## Prerequisites

- **Bun** - JavaScript runtime and package manager
- **PostgreSQL** - Database with pgvector extension
- **OpenAI API Key** - For AI responses

### Database Setup

```bash
# Start PostgreSQL
brew services start postgresql@14

# Install pgvector extension
brew install pgvector

# Create database
createdb koningschat

# Run schema (creates tables and pgvector extension)
psql -d koningschat -f backend/src/db/schema.sql
```

### Environment Configuration

Create `backend/.env`:
```env
DATABASE_URL=postgresql://yourusername@localhost:5432/koningschat
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
NODE_ENV=development
```

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

## Current Status

✅ **Working Features:**
- Vue 3 ChatWidget component with Dutch UI
- Hono API with OpenAI GPT-4 integration
- PostgreSQL database with pgvector ready
- Real-time chat with Dutch AI responses
- Health monitoring and error handling

🔄 **Next Steps:**
- Content scraping from Koningsspelen website
- Vector embeddings generation
- RAG (Retrieval Augmented Generation) implementation

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
│   │   ├── services/
│   │   │   ├── openai.ts
│   │   │   └── database.ts
│   │   ├── scripts/
│   │   │   └── scraper.ts
│   │   ├── db/
│   │   │   └── schema.sql
│   │   └── index.ts
│   ├── package.json
│   └── .env
├── docs/             # Documentation
├── package.json      # Root scripts
└── README.md
```

## Development

The project uses a monorepo structure with root-level scripts for easy development.

**Quick start:**
```bash
bun run install:all  # Install all dependencies
bun run dev          # Start both servers
```

**Testing:**
- Open http://localhost:5173 for the demo page
- Test chat functionality with Dutch questions
- Check API health: `bun run health`
