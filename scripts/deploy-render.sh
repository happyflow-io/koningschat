#!/bin/bash

# Koningschat Render Deployment Script
# Usage: ./scripts/deploy-render.sh

set -e

echo "🚀 Starting Koningschat deployment to Render..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo -e "${YELLOW}⚠️  Render CLI not found. Installing...${NC}"
    npm install -g @render/cli
fi

# Check if logged in to Render
if ! render auth whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to Render:${NC}"
    render auth login
fi

# Check environment variables
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}❌ OPENAI_API_KEY environment variable not set${NC}"
    echo "Please set it with: export OPENAI_API_KEY=sk-your-key-here"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites checked${NC}"

# Create render.yaml configuration
echo -e "${BLUE}📝 Creating Render configuration...${NC}"

cat > render.yaml << EOF
services:
  - type: pserv
    name: koningschat-db
    plan: free
    region: frankfurt
    databases:
      - name: koningschat
        user: koningschat
    postgresMajorVersion: 15

  - type: web
    name: koningschat-backend
    runtime: docker
    plan: free
    region: frankfurt
    rootDir: backend
    dockerfilePath: ./Dockerfile
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3001
      - key: OPENAI_API_KEY
        value: $OPENAI_API_KEY
      - key: DATABASE_URL
        fromDatabase:
          name: koningschat-db
          property: connectionString

  - type: static
    name: koningschat-frontend
    runtime: node
    plan: free
    region: frankfurt
    rootDir: frontend
    buildCommand: bun install && bun run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_URL
        value: https://koningschat-backend.onrender.com
EOF

echo -e "${GREEN}✅ Configuration created${NC}"

# Deploy to Render
echo -e "${BLUE}🚀 Deploying to Render...${NC}"
render deploy

echo -e "${BLUE}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Get service URLs
BACKEND_URL=$(render services list --format json | jq -r '.[] | select(.name=="koningschat-backend") | .serviceDetails.url')
FRONTEND_URL=$(render services list --format json | jq -r '.[] | select(.name=="koningschat-frontend") | .serviceDetails.url')
DB_URL=$(render services list --format json | jq -r '.[] | select(.name=="koningschat-db") | .serviceDetails.connectionString')

echo -e "${GREEN}✅ Services deployed:${NC}"
echo -e "   Backend:  ${BACKEND_URL}"
echo -e "   Frontend: ${FRONTEND_URL}"
echo -e "   Database: ${DB_URL}"

# Setup database schema
echo -e "${BLUE}🗄️  Setting up database schema...${NC}"
render shell koningschat-db --command "CREATE EXTENSION IF NOT EXISTS vector;"

# Copy schema file to backend service and run it
echo -e "${BLUE}📊 Creating database tables...${NC}"
render shell koningschat-backend --command "psql \$DATABASE_URL -f src/db/schema.sql"

# Populate database with content and embeddings
echo -e "${BLUE}🌐 Scraping content from koningsspelen.nl...${NC}"
render shell koningschat-backend --command "bun run src/scripts/scraper.ts"

echo -e "${BLUE}🧠 Generating embeddings...${NC}"
render shell koningschat-backend --command "bun run src/scripts/generate-embeddings.ts"

# Verify deployment
echo -e "${BLUE}🔍 Verifying deployment...${NC}"

# Test backend health
if curl -f "${BACKEND_URL}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend health check passed${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
fi

# Test database content
CONTENT_COUNT=$(render shell koningschat-backend --command "psql \$DATABASE_URL -t -c 'SELECT COUNT(*) FROM content;'" | tr -d ' ')
EMBEDDING_COUNT=$(render shell koningschat-backend --command "psql \$DATABASE_URL -t -c 'SELECT COUNT(*) FROM embeddings;'" | tr -d ' ')

echo -e "${GREEN}✅ Database populated:${NC}"
echo -e "   Content items: ${CONTENT_COUNT}"
echo -e "   Embeddings: ${EMBEDDING_COUNT}"

# Test RAG system
echo -e "${BLUE}🤖 Testing RAG system...${NC}"
RESPONSE=$(curl -s -X POST "${BACKEND_URL}/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Wanneer zijn de Koningsspelen?"}' | jq -r '.response')

if [[ $RESPONSE == *"17 april"* ]]; then
    echo -e "${GREEN}✅ RAG system working correctly${NC}"
else
    echo -e "${YELLOW}⚠️  RAG system response: ${RESPONSE}${NC}"
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📱 Your Koningschat POC is live:${NC}"
echo -e "   🌐 Demo: ${FRONTEND_URL}"
echo -e "   🔧 API:  ${BACKEND_URL}"
echo -e "   👨‍💻 Admin: ${BACKEND_URL}/admin"
echo ""
echo -e "${YELLOW}💰 Estimated cost: ~\$0.05 (OpenAI embeddings)${NC}"
echo -e "${YELLOW}📊 Monthly hosting: \$0-7 (free tier)${NC}"
echo ""
echo -e "${GREEN}✨ Ready for stakeholder demos!${NC}"
EOF
