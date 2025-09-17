# Render Deployment Plan for Koningschat POC

## Overview

Deploy Koningschat POC to Render with full RAG functionality including pgvector support.

**Estimated Time:** 10 minutes (automated) or 35-40 minutes (manual)  
**Cost:** ~$0.05 OpenAI API usage + $0-7/month hosting

## Quick Start (Automated CLI)

### Prerequisites
```bash
# 1. Install deployment tools
./scripts/setup-deployment.sh

# 2. Set OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# 3. Deploy everything
./scripts/deploy-render.sh
```

**That's it!** The script will:
- ✅ Create Render services (database, backend, frontend)
- ✅ Configure environment variables
- ✅ Deploy Docker containers
- ✅ Setup PostgreSQL + pgvector
- ✅ Run database schema
- ✅ Scrape content (21 pages)
- ✅ Generate embeddings (47 vectors)
- ✅ Verify deployment with tests
- ✅ Provide live URLs

## Manual Deployment (Alternative)

If you prefer manual control or the CLI fails, follow these steps:

## Prerequisites

- [x] GitHub repository with current code
- [x] Docker containers working locally
- [x] OpenAI API key available
- [ ] Render account created
- [ ] Environment variables documented

## Deployment Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   PostgreSQL    │
│   (Static)      │───▶│   (Docker)       │───▶│   + pgvector    │
│   Vue 3 + Vite  │    │   Bun + Hono     │    │   (Managed)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Step-by-Step Deployment

### Phase 1: Database Setup (5 minutes)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account
   - Verify email

2. **Create PostgreSQL Database**
   - Dashboard → "New" → "PostgreSQL"
   - Name: `koningschat-db`
   - Region: `Frankfurt` (EU, closest to Netherlands)
   - Plan: `Free` (for POC)
   - Click "Create Database"

3. **Enable pgvector Extension**
   - Wait for database to be ready
   - Go to database dashboard
   - Connect via psql or use web shell
   - Run: `CREATE EXTENSION IF NOT EXISTS vector;`

4. **Run Database Schema**
   ```sql
   -- Copy and paste content from backend/src/db/schema.sql
   -- This creates the content and embeddings tables
   ```

### Phase 2: Backend Deployment (10 minutes)

1. **Prepare Repository**
   - Ensure `backend/Dockerfile` exists
   - Verify `docker-compose.yml` is in root
   - Push latest changes to GitHub

2. **Create Backend Service**
   - Dashboard → "New" → "Web Service"
   - Connect GitHub repository
   - Name: `koningschat-backend`
   - Region: `Frankfurt`
   - Branch: `master`
   - Root Directory: `backend`
   - Runtime: `Docker`

3. **Configure Environment Variables**
   ```
   DATABASE_URL=<from database dashboard>
   OPENAI_API_KEY=<your-openai-key>
   PORT=3001
   NODE_ENV=production
   ```

4. **Deploy Settings**
   - Build Command: (auto-detected from Dockerfile)
   - Start Command: (auto-detected)
   - Plan: `Free` (for POC)
   - Click "Create Web Service"

### Phase 3: Frontend Deployment (5 minutes)

1. **Build Frontend Locally**
   ```bash
   cd frontend
   bun run build
   ```

2. **Create Static Site**
   - Dashboard → "New" → "Static Site"
   - Connect GitHub repository
   - Name: `koningschat-frontend`
   - Branch: `master`
   - Root Directory: `frontend`
   - Build Command: `bun install && bun run build`
   - Publish Directory: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://koningschat-backend.onrender.com
   ```

### Phase 5: Final Testing (5 minutes)

1. **Test Frontend**
   - Visit: `https://koningschat-frontend.onrender.com`
   - Verify multi-page website loads
   - Test chat overlay toggle

2. **Test Backend API**
   - Health check: `https://koningschat-backend.onrender.com/health`
   - Admin interface: `https://koningschat-backend.onrender.com/admin`
   - Verify stats show: 21 content, 47 embeddings

3. **Test RAG System**
   - Ask: "Wanneer zijn de Koningsspelen?"
   - Expected: "vrijdag 17 april 2026"
   - Verify Dutch responses with context

4. **Test Search Quality**
   - Use admin interface to test queries
   - Check similarity distances (<0.2 for good matches)
   - Verify embeddings are working

**Total Deployment Time:** 35-40 minutes
**OpenAI Cost:** ~$0.05 for embeddings generation

## Configuration Files

### Backend Environment Variables
```env
DATABASE_URL=postgresql://user:pass@host:port/db
OPENAI_API_KEY=sk-your-key-here
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://koningschat-frontend.onrender.com
```

### Frontend Environment Variables
```env
VITE_API_URL=https://koningschat-backend.onrender.com
```

## Post-Deployment Checklist

### Post-Deployment Checklist

### Functionality Tests
- [ ] Frontend loads at `https://koningschat-frontend.onrender.com`
- [ ] Backend health check: `https://koningschat-backend.onrender.com/health`
- [ ] Database connection working
- [ ] pgvector extension enabled
- [ ] **Content scraped: 21 pages from koningsspelen.nl**
- [ ] **Embeddings generated: 47 vector embeddings**
- [ ] Chat functionality working with Dutch responses
- [ ] RAG system retrieving relevant context
- [ ] Admin interface shows correct stats: `/admin`

### RAG System Verification
- [ ] Test query: "Wanneer zijn de Koningsspelen?" → "17 april 2026"
- [ ] Test query: "Wat is het thema?" → TWIST related response
- [ ] Admin interface shows 21 content items
- [ ] Admin interface shows 47 embeddings
- [ ] Search distances are reasonable (<0.2 for good matches)
- [ ] Dutch language responses are natural and accurate

### Performance Tests
- [ ] Page load times acceptable (<3s)
- [ ] Chat response times reasonable (<5s)
- [ ] Database queries performing well
- [ ] No memory/CPU issues

### Security Checks
- [ ] HTTPS enabled (automatic)
- [ ] Environment variables secure
- [ ] CORS configured correctly
- [ ] No sensitive data in logs

## Monitoring & Maintenance

### Render Dashboard Monitoring
- Service health status
- Resource usage (CPU, memory)
- Request logs and errors
- Database connection status

### Application Monitoring
- Chat response accuracy
- RAG system performance
- OpenAI API usage and costs
- User interaction patterns

## Troubleshooting Guide

### Common Issues

**Database Connection Errors:**
- Verify DATABASE_URL format
- Check database service status
- Ensure pgvector extension installed

**Frontend API Errors:**
- Verify VITE_API_URL points to backend
- Check CORS configuration
- Ensure backend is deployed and running

**RAG System Not Working:**
- Verify embeddings are populated
- Check OpenAI API key validity
- Test vector similarity search

**Performance Issues:**
- Monitor resource usage in dashboard
- Consider upgrading to paid plans
- Optimize database queries

## Rollback Plan

If deployment fails:
1. Check service logs in Render dashboard
2. Verify environment variables
3. Test locally with production config
4. Rollback to previous working commit
5. Redeploy with fixes

## Success Metrics

**Technical:**
- All services green in dashboard
- Response times <5s for chat
- Database queries <1s
- Zero critical errors in logs

**Business:**
- Demo URL accessible to stakeholders
- Chat provides accurate Dutch responses
- RAG system uses Koningsspelen content
- Admin interface shows 47 embeddings

## Next Steps After Successful Deployment

1. **Share demo URL** with stakeholders
2. **Gather feedback** on functionality
3. **Monitor usage** and performance
4. **Plan AWS migration** if POC successful
5. **Document lessons learned** for production deployment

## Estimated Costs

**Free Tier (POC):**
- PostgreSQL: Free (1GB storage)
- Backend: Free (750 hours/month)
- Frontend: Free (100GB bandwidth)
- **Total: $0/month**

**If Scaling Needed:**
- PostgreSQL: $7/month (25GB storage)
- Backend: $7/month (dedicated resources)
- Frontend: Free (sufficient for POC)
- **Total: $14/month**
