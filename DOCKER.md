# Docker Setup Guide

## Prerequisites

- Docker Desktop installed
- OpenAI API key

## Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repo>
   cd koningschat
   cp .env.example .env
   ```

2. **Add your OpenAI API key to `.env`:**
   ```bash
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Start everything:**
   ```bash
   docker-compose up
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5432

## Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild containers
docker-compose build

# Reset database
docker-compose down -v
docker-compose up
```

## Services

- **Frontend**: Vue 3 + Vite (port 3000)
- **Backend**: Bun + Hono API (port 3001)  
- **Database**: PostgreSQL + pgvector (port 5432)

## Development

- Code changes auto-reload (hot reload enabled)
- Database schema auto-applied on first run
- Persistent data in Docker volumes

## Troubleshooting

**Port conflicts:**
```bash
# Check what's using ports
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill processes if needed
kill -9 <PID>
```

**Clean restart:**
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**Database issues:**
```bash
# Connect to database
docker-compose exec db psql -U koningschat -d koningschat

# View tables
\dt

# Check pgvector
SELECT * FROM pg_extension WHERE extname = 'vector';
```
