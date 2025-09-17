# Deployment Scripts

Automated deployment scripts for Koningschat POC.

## Quick Deployment

```bash
# 1. Setup prerequisites
./scripts/setup-deployment.sh

# 2. Set your OpenAI API key
export OPENAI_API_KEY=sk-your-actual-key-here

# 3. Deploy to Render
./scripts/deploy-render.sh
```

## Scripts Overview

### `setup-deployment.sh`
Installs required tools:
- Render CLI
- jq (JSON processor)
- Checks OpenAI API key

### `deploy-render.sh`
Full automated deployment:
- Creates Render services
- Deploys containers
- Sets up database + pgvector
- Scrapes content and generates embeddings
- Runs verification tests
- Provides live URLs

## Requirements

- Node.js (for Render CLI)
- OpenAI API key
- Git repository pushed to GitHub
- Internet connection

## What Gets Deployed

- **Database:** PostgreSQL + pgvector on Render
- **Backend:** Bun + Hono API with RAG system
- **Frontend:** Vue 3 static site
- **Content:** 21 pages from koningsspelen.nl
- **Embeddings:** 47 vector embeddings for search

## Output

After successful deployment:
- 🌐 **Demo URL:** https://koningschat-frontend.onrender.com
- 🔧 **API URL:** https://koningschat-backend.onrender.com
- 👨‍💻 **Admin:** https://koningschat-backend.onrender.com/admin

## Troubleshooting

**Render CLI not found:**
```bash
npm install -g @render/cli
```

**Not logged in to Render:**
```bash
render auth login
```

**OpenAI API key missing:**
```bash
export OPENAI_API_KEY=sk-your-key-here
```

**Deployment failed:**
- Check Render dashboard for service logs
- Verify GitHub repository is accessible
- Ensure Docker containers build locally
