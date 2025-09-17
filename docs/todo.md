# Koningschat - TODO List

## Current Status
✅ Project structure created  
✅ Requirements documented  
✅ Architecture designed  
✅ Language specification defined  
✅ Company techstack documented  
✅ Database schema created  
✅ Website scraper implemented  
✅ Backend package.json configured  
✅ Frontend refactored into ChatWidget component  
✅ useChat composable created  
✅ Demo page setup for development  
✅ Environment variables configured  
✅ PostgreSQL database setup with pgvector  
✅ OpenAI integration with Dutch responses working  
✅ Backend API fully functional (/health, /api/chat)  
✅ Frontend widget complete with Dutch UI  
✅ Development scripts for easy startup  
✅ Content scraping completed (21 pages from koningsspelen.nl)  
✅ Embeddings generation service implemented  
✅ 48 embeddings generated and stored in database  

## Phase 1: Content & Database Setup

### 1. Database Setup
- ✅ Create local PostgreSQL database
- ✅ Install pgvector extension
- ✅ Run schema.sql to create tables
- ✅ Test database connection

### 2. Content Ingestion
- ✅ Run scraper to collect Koningsspelen content
- ✅ Verify content quality and completeness
- ✅ Clean and process scraped content if needed

### 3. Embeddings Generation
- ✅ Create embeddings service (OpenAI integration)
- ✅ Implement text chunking for optimal embeddings
- ✅ Generate embeddings for all content
- ✅ Store embeddings in PostgreSQL with pgvector

## Phase 2: API Implementation

### 4. Core API Services
- ✅ Create database connection service
- ✅ Implement vector similarity search
- ✅ Create OpenAI service for chat completions
- ✅ Build RAG pipeline (retrieve + generate)

### 5. Hono API Enhancement
- ✅ Basic Hono server exists with /api/chat endpoint
- ✅ Replace placeholder response with OpenAI integration
- ✅ Add CORS configuration for external websites
- ✅ Implement Dutch system prompts for OpenAI
- ✅ Add error handling with Dutch messages
- ✅ Add RAG functionality (vector search + context)

### 6. RAG Quality Improvements
- [ ] **Chunking Optimization**
  - [ ] Reduce chunk size from 1000 to 500 characters
  - [ ] Add overlap between chunks (50 chars)
  - [ ] Test chunk quality with sample queries
- [ ] **Search Quality**
  - [ ] Implement query expansion with synonyms
  - [ ] Add reranking of search results (top 5 → best 3)
  - [ ] Test search accuracy with demo questions
- [ ] **Response Quality**
  - [ ] Improve system prompt specificity
  - [ ] Lower temperature to 0.1 for consistency
  - [ ] Add explicit context validation
- [ ] **Quality Testing Framework**
  - [ ] Create test queries with expected answers
  - [ ] Automated quality scoring system
  - [ ] Performance benchmarking

### 7. API Testing
- ✅ Test API locally with sample questions
- ✅ Verify Dutch responses
- ✅ Test vector search accuracy
- [ ] Performance testing
- [ ] Quality benchmarking with demo questions

## Phase 3: Frontend Widget (Updated Requirements)

### 7. Vue 3 Widget Setup
- ✅ Frontend package.json setup
- ✅ Vite configuration working
- ✅ ChatWidget.vue component created
- ✅ useChat.ts composable implemented
- ✅ TailwindCSS styling applied

### 8. Widget Features (Updated UX)
- ✅ Chat interface with Dutch labels
- ✅ Message history display
- ✅ Typing indicators (loading animation)
- ✅ Loading states with Dutch text
- ✅ Error handling with Dutch messages
- ✅ **NEW: Fullscreen overlay chat interface**
- ✅ **NEW: Toggle button for overlay/website view**
- ✅ **NEW: State management for overlay visibility**
- ✅ **NEW: Full-height chat area utilization**
- ✅ **NEW: Auto-scroll on user message and bot response**
- ✅ **NEW: Proper message alignment (user right, bot left)**
- ✅ **NEW: Different background colors for user vs bot messages**
- ✅ **NEW: Auto-focus input field for immediate typing**
- ✅ **NEW: Streaming response (typewriter effect) for bot messages**
- ✅ **NEW: Fine-tune streaming speed with typewriter delay (per chunk vs per character)**

### 9. Widget Integration (Revised Approach)
- ✅ Demo page created for testing
- ✅ **UPDATED: Create fullscreen overlay integration script**
- ✅ **UPDATED: Implement toggle functionality (chat ↔ website)**
- ✅ **UPDATED: First-visit detection (show chat by default)**
- ✅ **UPDATED: State persistence with localStorage**
- ✅ **NEW: Multi-page website for overlay testing**
- ✅ **NEW: Vue Router integration with overlay state**
- [ ] **NEW: Create external website integration script**
- [ ] **NEW: Test integration on external HTML page**
- ✅ Responsive design implemented

## Phase 4: Integration & Testing (Updated)

### 10. End-to-End Testing
- ✅ Test complete flow: question → API → response → widget
- ✅ Verify Dutch conversation quality
- ✅ Test with various Koningsspelen questions
- ✅ **NEW: Test fullscreen overlay toggle functionality**
- ✅ **NEW: Test auto-scroll and auto-focus features**
- [ ] Performance optimization

### 11. Documentation
- [ ] API documentation
- ✅ **UPDATED: Fullscreen overlay integration guide**
- ✅ **UPDATED: Demo setup documentation**
- [ ] Usage examples for external websites

### 12. Deployment
- [ ] Frontend deployment (AWS)
- [ ] Backend deployment (AWS Lambda)
- [ ] Database deployment (AWS RDS PostgreSQL + pgvector)
- [ ] Environment configuration for production
- [ ] CI/CD pipeline setup

## Phase 5: Deployment (Future)

### 12. Deployment
- [ ] Frontend deployment (AWS)
- [ ] Backend deployment (AWS Lambda)
- [ ] Database deployment (AWS RDS PostgreSQL + pgvector)
- [ ] Environment configuration for production
- [ ] CI/CD pipeline setup

### 13. Production Ready
- [ ] Docker containerization
- [ ] Security hardening
- [ ] Monitoring setup
- [ ] Rate limiting
- [ ] Error tracking

## Next Steps (Immediate Priority)

1. **RAG Quality Improvements** - Optimize chunking, search, and response quality
2. **Demo Preparation** - Frontend polish and test scenarios
3. **External Integration Script** - For embedding on external websites
4. **Performance optimization** - Optimize vector search and response times

## Demo Readiness Checklist

### Frontend Polish (COMPLETED ✅)
- ✅ Show sources in chat interface
- ✅ Improve styling for demo presentation
- ✅ Better loading states
- ✅ **NEW: Fullscreen overlay implementation**
- ✅ **NEW: Proper message alignment and colors**
- ✅ **NEW: Auto-scroll and auto-focus functionality**

### Demo Setup (15 min)
- ✅ **UPDATED: Multi-page demo website (Home, Inschrijven, Activiteiten, Contact)**
- ✅ **UPDATED: Top navigation with active states**
- ✅ **UPDATED: Docker-based demo environment**
- ✅ Demo question list preparation
- ✅ Test scenarios documentation

### 12. Docker Setup (NEW - COMPLETED)
- ✅ **NEW: Docker Compose configuration for all services**
- ✅ **NEW: PostgreSQL + pgvector container setup**
- ✅ **NEW: Backend container with Bun runtime**
- ✅ **NEW: Frontend container with Node.js 20 + Vite**
- ✅ **NEW: Environment variable management (.env.example)**
- ✅ **NEW: Health checks and service dependencies**
- ✅ **NEW: Hot reload for development**
- ✅ **NEW: Docker documentation (DOCKER.md)**

### 13. Security & Production Hardening (NEW - HIGH PRIORITY)
- [ ] **NEW: Rate limiting** - 20 requests/15min per IP to prevent API abuse
- [ ] **NEW: CORS restrictions** - Only allow specific domains to call API
- [ ] **NEW: Request validation** - Max message length (500 chars), spam detection
- [ ] **NEW: OpenAI budget limits** - Hard cap at $25-50/month with alerts
- [ ] **NEW: Environment security** - AWS Parameter Store for API keys
- [ ] **NEW: Request logging** - Track usage patterns and potential abuse
- [ ] **NEW: Authentication system** - Optional user identification
- [ ] **NEW: Network security** - VPC, Security Groups, WAF for AWS deployment

### Quality Assurance
- [ ] Test with demo questions:
  - "Wanneer zijn de Koningsspelen?" → "17 april 2026"
  - "Wat krijgen scholen bij inschrijving?" → "Sport- en Feestpakket"
  - "Wat is het thema?" → "TWIST"
  - "Hoe werkt het ontbijt?" → "Koningsontbijt info"

## Testing

**Current capability:**
```bash
# Start full stack
bun run dev

# Test health
bun run health

# Generate embeddings (if needed)
cd backend && bun run embeddings

# Test chat (manual in browser at localhost:3000)
```

**Data status:**
- ✅ 21 pages scraped from koningsspelen.nl
- ✅ 48 embeddings generated and stored
- ✅ Ready for RAG implementation
