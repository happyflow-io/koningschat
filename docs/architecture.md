# Koningschat - Architectuur Overzicht

## High-Level Architectuur

```
┌─────────────────────────────────────┐
│        Koningsspelen Website        │
│  ┌─────────────────────────────────┐ │
│  │     Koningschat Widget          │ │
│  │   (Vue 3 Component)             │ │
│  │                                 │ │
│  │  ┌─────────────────────────────┐│ │
│  │  │     Chat Interface          ││ │
│  │  │   - Input field             ││ │
│  │  │   - Message history         ││ │
│  │  │   - Typing indicator        ││ │
│  │  └─────────────────────────────┘│ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
                    │
                    │ HTTPS API calls
                    │
                    ▼
┌─────────────────────────────────────┐
│           AWS Lambda                │
│     ┌─────────────────────────────┐ │
│     │      Hono API Server        │ │
│     │                             │ │
│     │  ┌─────────────────────────┐│ │
│     │  │   Chat Endpoint         ││ │
│     │  │   /api/chat             ││ │
│     │  └─────────────────────────┘│ │
│     │                             │ │
│     │  ┌─────────────────────────┐│ │
│     │  │   RAG Service           ││ │
│     │  │   - Vector search       ││ │
│     │  │   - Context retrieval   ││ │
│     │  └─────────────────────────┘│ │
│     └─────────────────────────────┘ │
└─────────────────────────────────────┘
                    │
                    │ Database queries
                    │
                    ▼
┌─────────────────────────────────────┐
│           AWS RDS                   │
│     ┌─────────────────────────────┐ │
│     │    PostgreSQL + pgvector    │ │
│     │                             │ │
│     │  ┌─────────────────────────┐│ │
│     │  │   Content Table         ││ │
│     │  │   - Page content        ││ │
│     │  │   - Metadata            ││ │
│     │  └─────────────────────────┘│ │
│     │                             │ │
│     │  ┌─────────────────────────┐│ │
│     │  │   Embeddings Table      ││ │
│     │  │   - Vector embeddings   ││ │
│     │  │   - Content chunks      ││ │
│     │  └─────────────────────────┘│ │
│     └─────────────────────────────┘ │
└─────────────────────────────────────┘
                    │
                    │ AI API calls
                    │
                    ▼
┌─────────────────────────────────────┐
│           OpenAI API                │
│                                     │
│  ┌─────────────────────────────────┐│
│  │         GPT-4 Model             ││
│  │     (Response generation)       ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Embeddings Model           ││
│  │    (Content vectorization)      ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Widget Integratie

### Externe Website Implementatie

**Optie 1: Script Tag (Eenvoudigst)**
```html
<!-- In de <head> van externe website -->
<script src="https://cdn.koningschat.nl/widget.js"></script>

<!-- Waar de chat moet verschijnen -->
<div id="koningschat-widget"></div>

<script>
  KoningschatWidget.init({
    containerId: 'koningschat-widget',
    apiUrl: 'https://api.koningschat.nl',
    theme: 'light'
  });
</script>
```

**Optie 2: NPM Package**
```bash
npm install @koningsspelen/koningschat-widget
```

```javascript
import { KoningschatWidget } from '@koningsspelen/koningschat-widget';

KoningschatWidget.mount('#chat-container', {
  apiUrl: 'https://api.koningschat.nl'
});
```

## Data Flow

### 1. User Interaction
```
User types question → Widget captures input → Validates input
```

### 2. API Request
```
Widget → HTTPS POST /api/chat → Lambda Function
```

### 3. RAG Process
```
Lambda → Vector search in PostgreSQL → Retrieve relevant content
```

### 4. AI Generation
```
Lambda → OpenAI API (context + question) → Generated response
```

### 5. Response Delivery
```
Lambda → JSON response → Widget → Display to user
```

## Security & CORS

### Cross-Origin Setup
- API configureerd voor CORS
- Whitelist van toegestane domains
- API keys voor rate limiting

### Widget Security
- Content Security Policy compatible
- No sensitive data in frontend
- Input sanitization

## Deployment Architectuur

### Frontend (Widget)
```
Source Code → Vite Build → CDN (CloudFront) → External Websites
```

### Backend (API)
```
Source Code → Docker Image → AWS Lambda → Auto-scaling
```

### Database
```
Content Scraping → Processing → PostgreSQL + pgvector → Vector Search
```

## Schaalbaarheid

### Traffic Handling
- AWS Lambda: Auto-scaling tot 1000+ concurrent executions
- RDS: Read replicas voor database scaling
- CloudFront CDN: Global widget distribution

### Cost Optimization
- Lambda: Pay per request
- RDS: Reserved instances voor predictable load
- OpenAI: Token-based pricing

## Monitoring & Analytics

### Widget Analytics
- Usage tracking (anonymous)
- Error reporting
- Performance metrics

### API Monitoring
- Response times
- Error rates
- OpenAI token usage
- Database performance

## Antwoord op je vraag

**Ja, externe websites kunnen onze widget plaatsen!**

1. **Widget** = JavaScript component die op elke website kan draaien
2. **API** = Onze backend die de AI-responses genereert
3. **Cross-domain** = CORS zorgt voor veilige communicatie
4. **Eenvoudige integratie** = Één script tag is genoeg

De widget werkt zoals Google Analytics of andere third-party widgets - volledig zelfstandig maar communiceert met onze servers.
