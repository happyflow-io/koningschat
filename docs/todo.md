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

## Phase 1: Content & Database Setup

### 1. Database Setup
- [ ] Create local PostgreSQL database
- [ ] Install pgvector extension
- [ ] Run schema.sql to create tables
- [ ] Test database connection

### 2. Content Ingestion
- [ ] Set up environment variables (.env file)
- [ ] Run scraper to collect Koningsspelen content
- [ ] Verify content quality and completeness
- [ ] Clean and process scraped content if needed

### 3. Embeddings Generation
- [ ] Create embeddings service (OpenAI integration)
- [ ] Implement text chunking for optimal embeddings
- [ ] Generate embeddings for all content
- [ ] Store embeddings in PostgreSQL with pgvector

## Phase 2: API Implementation

### 4. Core API Services
- [ ] Create database connection service
- [ ] Implement vector similarity search
- [ ] Create OpenAI service for chat completions
- [ ] Build RAG pipeline (retrieve + generate)

### 5. Hono API Endpoints
- [ ] Create main Hono server (src/index.ts)
- [ ] Implement /api/chat endpoint
- [ ] Add CORS configuration for external websites
- [ ] Implement Dutch system prompts for OpenAI
- [ ] Add error handling with Dutch messages

### 6. API Testing
- [ ] Test API locally with sample questions
- [ ] Verify Dutch responses
- [ ] Test vector search accuracy
- [ ] Performance testing

## Phase 3: Frontend Widget

### 7. Vue 3 Widget Setup
- [ ] Create frontend package.json
- [ ] Setup Vite configuration
- [ ] Create ChatWidget.vue component
- [ ] Implement useChat.ts composable
- [ ] Add TailwindCSS styling

### 8. Widget Features
- [ ] Chat interface with Dutch labels
- [ ] Message history display
- [ ] Typing indicators
- [ ] Loading states with Dutch text
- [ ] Error handling with Dutch messages

### 9. Widget Integration
- [ ] Create widget initialization script
- [ ] Test widget on simple HTML page
- [ ] Verify API communication
- [ ] Test responsive design

## Phase 4: Integration & Testing

### 10. End-to-End Testing
- [ ] Test complete flow: question → API → response → widget
- [ ] Verify Dutch conversation quality
- [ ] Test with various Koningsspelen questions
- [ ] Performance optimization

### 11. Documentation
- [ ] API documentation
- [ ] Widget integration guide
- [ ] Deployment instructions
- [ ] Usage examples

## Phase 5: Deployment (Future)

### 12. AWS Setup
- [ ] Configure AWS Lambda for Hono API
- [ ] Setup AWS RDS PostgreSQL
- [ ] Configure CDN for widget distribution
- [ ] Environment configuration

### 13. Production Ready
- [ ] Security hardening
- [ ] Monitoring setup
- [ ] Rate limiting
- [ ] Error tracking

## Next Steps (Immediate Priority)

1. **Database Setup** - Get PostgreSQL running locally
2. **Environment Configuration** - Create .env file with OpenAI key
3. **Content Scraping** - Run scraper to get Koningsspelen data
4. **Embeddings Service** - Create service to generate and store embeddings

## Notes

- Focus on getting basic chat working first
- Test with real Koningsspelen questions early
- Prioritize Dutch language quality
- Keep widget lightweight for external integration
