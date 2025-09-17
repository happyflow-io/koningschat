# Deployment Scripts

CLI-assisted deployment scripts for Koningschat POC.

## Quick Deployment

```bash
# 1. Ensure .env file has OpenAI API key
cat .env | grep OPENAI_API_KEY

# 2. Run CLI-assisted deployment
./scripts/deploy-render-cli.sh
```

## Scripts Overview

### `deploy-render-cli.sh` (Recommended)
CLI-assisted deployment with pre-configured instructions:
- Loads OpenAI API key from .env file
- Generates step-by-step Render dashboard instructions
- Provides copy-paste ready environment variables
- Includes your GitHub repository URL
- No manual configuration needed

### `deploy-guide.sh` (Alternative)
Interactive deployment guide:
- Requires manual API key export
- Basic deployment instructions
- Less automation than CLI-assisted version

### `setup-deployment.sh` (Legacy)
Prerequisites installer (not needed for current approach):
- Attempts to install Render CLI (not available)
- Basic environment checks

## CLI Status

**Official Render CLI:** Not available via standard package managers
- The `render` command from `brew install render` is a template renderer, not Render.com CLI
- Render.com doesn't provide an official CLI via npm or brew

**Our Solution:** CLI-assisted manual deployment
- Best of both worlds: automation + reliability
- Pre-configured instructions with your specific values
- Copy-paste ready environment variables

## Requirements

- .env file with OPENAI_API_KEY
- Git repository pushed to GitHub
- Internet connection for Render dashboard access

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

**OpenAI API key not found:**
```bash
# Check .env file
cat .env | grep OPENAI_API_KEY

# Should show: OPENAI_API_KEY=sk-proj-...
```

**Script doesn't run:**
```bash
# Make executable
chmod +x scripts/deploy-render-cli.sh
```

**Deployment failed:**
- Check Render dashboard for service logs
- Verify GitHub repository is accessible
- Ensure Docker containers build locally
- Confirm pgvector extension is enabled in database
