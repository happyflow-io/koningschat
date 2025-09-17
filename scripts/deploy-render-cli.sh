#!/bin/bash

# Koningschat Render CLI Deployment
# Usage: ./scripts/deploy-render-cli.sh

set -e

echo "🚀 Starting Koningschat CLI deployment to Render..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Load environment variables from .env file
echo -e "${BLUE}📋 Loading environment variables...${NC}"
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    echo -e "${GREEN}✅ Loaded .env file${NC}"
else
    echo -e "${RED}❌ .env file not found${NC}"
    exit 1
fi

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command -v render &> /dev/null; then
    echo -e "${RED}❌ Render CLI not found. Installing...${NC}"
    brew install render
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}❌ OPENAI_API_KEY not found in .env file${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites checked${NC}"
echo -e "${GREEN}✅ OpenAI API key loaded from .env${NC}"

# Login to Render
echo -e "${BLUE}🔐 Logging into Render...${NC}"
if ! render whoami --output json &> /dev/null; then
    echo "Please login to Render:"
    render login
fi

echo -e "${GREEN}✅ Logged into Render${NC}"

# Provide deployment instructions using CLI where possible
echo -e "${BLUE}📝 Render Deployment Instructions (CLI-Assisted)${NC}"
echo ""
echo -e "${YELLOW}We'll use a combination of Render CLI and dashboard for optimal deployment.${NC}"
echo ""

echo "1. 🗄️  Create PostgreSQL Database via CLI:"
echo "   render services create --type postgresql --name koningschat-db --region frankfurt --plan free"
echo ""

echo "2. 🐳 Create Backend Web Service:"
echo "   • Go to https://dashboard.render.com (easier for complex config)"
echo "   • Click 'New' → 'Web Service'"
echo "   • Connect GitHub: https://github.com/happyflow-io/koningschat.git"
echo "   • Name: koningschat-backend"
echo "   • Root Directory: backend"
echo "   • Runtime: Docker"
echo "   • Environment Variables:"
echo "     DATABASE_URL=<from database dashboard>"
echo "     OPENAI_API_KEY=${OPENAI_API_KEY}"
echo "     NODE_ENV=production"
echo "     PORT=3001"
echo ""

echo "3. 🌐 Create Frontend Static Site:"
echo "   • Dashboard: 'New' → 'Static Site'"
echo "   • Connect same GitHub repo"
echo "   • Name: koningschat-frontend"
echo "   • Root Directory: frontend"
echo "   • Build Command: bun install && bun run build"
echo "   • Publish Directory: dist"
echo "   • Environment Variables:"
echo "     VITE_API_URL=https://koningschat-backend.onrender.com"
echo ""

echo "4. 🔧 Setup Database (via CLI):"
echo "   render psql koningschat-db"
echo "   # Then run: CREATE EXTENSION IF NOT EXISTS vector;"
echo "   # Import schema from backend/src/db/schema.sql"
echo ""

echo "5. 📊 Populate Data (via CLI):"
echo "   render ssh koningschat-backend"
echo "   # Then run:"
echo "   # bun run src/scripts/scraper.ts"
echo "   # bun run src/scripts/generate-embeddings.ts"
echo ""

echo -e "${GREEN}🎉 After completion:${NC}"
echo "   🌐 Demo: https://koningschat-frontend.onrender.com"
echo "   🔧 API:  https://koningschat-backend.onrender.com"
echo "   👨‍💻 Admin: https://koningschat-backend.onrender.com/admin"
echo ""

echo -e "${BLUE}📊 Check deployment status:${NC}"
echo "   render services list"
echo "   render logs koningschat-backend"
echo ""

echo -e "${YELLOW}💰 Cost: ~\$0.05 (OpenAI) + \$0-7/month (hosting)${NC}"
echo -e "${GREEN}✨ Ready for stakeholder demos!${NC}"
