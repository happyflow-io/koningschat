#!/bin/bash

# Koningschat Render Deployment Guide
# Interactive deployment assistant

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Koningschat POC Deployment Guide${NC}"
echo ""

# Check OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  OpenAI API key needed${NC}"
    echo "Please set your OpenAI API key:"
    echo "export OPENAI_API_KEY=sk-your-key-here"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ OpenAI API key is set${NC}"
echo ""

# Get current repo URL
REPO_URL=$(git remote get-url origin)
echo -e "${BLUE}📂 Repository: ${REPO_URL}${NC}"
echo ""

echo -e "${BLUE}📋 Deployment Steps:${NC}"
echo ""
echo "1. 🌐 Open: https://dashboard.render.com"
echo "2. 📝 Create account or login with GitHub"
echo ""
echo "3. 🗄️  Create PostgreSQL Database:"
echo "   • Click 'New' → 'PostgreSQL'"
echo "   • Name: koningschat-db"
echo "   • Region: Frankfurt"
echo "   • Plan: Free"
echo "   • Click 'Create Database'"
echo ""
echo "4. 🐳 Create Backend Service:"
echo "   • Click 'New' → 'Web Service'"
echo "   • Connect GitHub: ${REPO_URL}"
echo "   • Name: koningschat-backend"
echo "   • Root Directory: backend"
echo "   • Runtime: Docker"
echo "   • Environment Variables:"
echo "     DATABASE_URL=<copy from database dashboard>"
echo "     OPENAI_API_KEY=${OPENAI_API_KEY}"
echo "     NODE_ENV=production"
echo "     PORT=3001"
echo ""
echo "5. 🌐 Create Frontend Service:"
echo "   • Click 'New' → 'Static Site'"
echo "   • Connect same GitHub repo"
echo "   • Name: koningschat-frontend"
echo "   • Root Directory: frontend"
echo "   • Build Command: bun install && bun run build"
echo "   • Publish Directory: dist"
echo "   • Environment Variables:"
echo "     VITE_API_URL=https://koningschat-backend.onrender.com"
echo ""
echo "6. 🔧 Setup Database (after services are deployed):"
echo "   • Go to database dashboard"
echo "   • Click 'Connect' → 'External Connection'"
echo "   • Run: CREATE EXTENSION IF NOT EXISTS vector;"
echo "   • Copy/paste content from backend/src/db/schema.sql"
echo ""
echo "7. 📊 Populate Data:"
echo "   • Go to backend service dashboard"
echo "   • Click 'Shell' tab"
echo "   • Run: bun run src/scripts/scraper.ts"
echo "   • Run: bun run src/scripts/generate-embeddings.ts"
echo ""
echo -e "${GREEN}🎉 After completion, your POC will be live at:${NC}"
echo "   🌐 Demo: https://koningschat-frontend.onrender.com"
echo "   🔧 API:  https://koningschat-backend.onrender.com"
echo "   👨‍💻 Admin: https://koningschat-backend.onrender.com/admin"
echo ""
echo -e "${YELLOW}💰 Cost: ~\$0.05 (OpenAI) + \$0-7/month (hosting)${NC}"
echo -e "${YELLOW}⏱️  Time: ~15-20 minutes${NC}"
echo ""
echo -e "${BLUE}📚 Detailed guide: docs/render-deployment-plan.md${NC}"
