#!/bin/bash

# Koningschat Render Deployment via API
# Usage: ./scripts/deploy-render-api.sh

set -e

echo "🚀 Starting Koningschat deployment to Render via API..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl not found. Please install curl first.${NC}"
    exit 1
fi

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not found. Installing...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install jq
    else
        echo -e "${RED}❌ Please install jq manually${NC}"
        exit 1
    fi
fi

# Check environment variables
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}❌ OPENAI_API_KEY environment variable not set${NC}"
    echo "Please set it with: export OPENAI_API_KEY=sk-your-key-here"
    exit 1
fi

if [ -z "$RENDER_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  RENDER_API_KEY not set.${NC}"
    echo "Please:"
    echo "1. Go to https://dashboard.render.com/account/api-keys"
    echo "2. Create a new API key"
    echo "3. Set it with: export RENDER_API_KEY=your-render-api-key"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites checked${NC}"

# Manual deployment instructions
echo -e "${BLUE}📝 Manual Render Deployment Instructions${NC}"
echo ""
echo -e "${YELLOW}Since Render CLI is not available, please follow these steps:${NC}"
echo ""
echo "1. 🌐 Go to https://dashboard.render.com"
echo "2. 📝 Create account or login"
echo "3. 🗄️  Create PostgreSQL database:"
echo "   - Name: koningschat-db"
echo "   - Region: Frankfurt"
echo "   - Plan: Free"
echo ""
echo "4. 🐳 Create Backend Web Service:"
echo "   - Connect GitHub repo: $(git remote get-url origin)"
echo "   - Name: koningschat-backend"
echo "   - Root Directory: backend"
echo "   - Runtime: Docker"
echo "   - Environment Variables:"
echo "     DATABASE_URL=<from database dashboard>"
echo "     OPENAI_API_KEY=${OPENAI_API_KEY}"
echo "     NODE_ENV=production"
echo "     PORT=3001"
echo ""
echo "5. 🌐 Create Frontend Static Site:"
echo "   - Connect same GitHub repo"
echo "   - Name: koningschat-frontend"
echo "   - Root Directory: frontend"
echo "   - Build Command: bun install && bun run build"
echo "   - Publish Directory: dist"
echo "   - Environment Variables:"
echo "     VITE_API_URL=https://koningschat-backend.onrender.com"
echo ""
echo "6. 🗄️  Setup Database:"
echo "   - Connect to database via psql"
echo "   - Run: CREATE EXTENSION IF NOT EXISTS vector;"
echo "   - Import schema from backend/src/db/schema.sql"
echo ""
echo "7. 📊 Populate Data:"
echo "   - SSH into backend service"
echo "   - Run: bun run src/scripts/scraper.ts"
echo "   - Run: bun run src/scripts/generate-embeddings.ts"
echo ""
echo -e "${GREEN}✨ After deployment, your URLs will be:${NC}"
echo "   🌐 Demo: https://koningschat-frontend.onrender.com"
echo "   🔧 API:  https://koningschat-backend.onrender.com"
echo "   👨‍💻 Admin: https://koningschat-backend.onrender.com/admin"
echo ""
echo -e "${YELLOW}💰 Estimated cost: ~\$0.05 (OpenAI embeddings) + \$0-7/month (hosting)${NC}"
echo ""
echo -e "${BLUE}📚 For detailed steps, see: docs/render-deployment-plan.md${NC}"
