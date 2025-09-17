#!/bin/bash

# Koningschat Deployment Setup Script
# Installs prerequisites for Render deployment

set -e

echo "🔧 Setting up deployment prerequisites..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

# Install Render CLI
echo -e "${BLUE}📦 Installing Render CLI...${NC}"
npm install -g @render/cli

# Install jq for JSON parsing
echo -e "${BLUE}📦 Installing jq...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
        brew install jq
    else
        echo -e "${YELLOW}⚠️  Please install Homebrew first, then run: brew install jq${NC}"
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo apt-get update && sudo apt-get install -y jq
else
    echo -e "${YELLOW}⚠️  Please install jq manually for your system${NC}"
fi

# Check OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  OPENAI_API_KEY not set. Please add to your shell profile:${NC}"
    echo "export OPENAI_API_KEY=sk-your-key-here"
    echo ""
    echo "Then reload your shell or run: source ~/.bashrc"
else
    echo -e "${GREEN}✅ OPENAI_API_KEY is set${NC}"
fi

echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Set your OpenAI API key (if not done)"
echo "2. Run: ./scripts/deploy-render.sh"
echo "3. Follow the prompts to login to Render"
