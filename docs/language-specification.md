# Language Specification

## Overview
This document defines the language requirements for the Koningschat project.

## Language Strategy

### Development & Documentation
- **Language**: English
- **Rationale**: International development standards, team collaboration, open source compatibility
- **Applies to**:
  - All code comments
  - Documentation files
  - README files
  - API documentation
  - Technical specifications
  - Git commit messages
  - Variable and function names

### User Interface & Experience
- **Language**: Dutch
- **Rationale**: Target audience is Dutch-speaking visitors to Koningsspelen website
- **Applies to**:
  - Chat widget interface
  - User-facing messages
  - Error messages
  - Loading states
  - Button labels
  - Placeholder text

### AI Responses & Content
- **Language**: Dutch
- **Rationale**: Natural conversation with Dutch visitors
- **Applies to**:
  - Chatbot responses
  - System prompts to OpenAI
  - Content processing
  - Fallback messages
  - Help text

## Implementation Guidelines

### Frontend (Vue Components)
```typescript
// Code and comments in English
const chatMessages = ref<ChatMessage[]>([]);

// UI text in Dutch
const placeholderText = "Stel je vraag over de Koningsspelen...";
const sendButtonText = "Versturen";
const errorMessage = "Er ging iets mis. Probeer het opnieuw.";
```

### Backend (API)
```typescript
// Code and comments in English
export async function generateResponse(question: string): Promise<string> {
  // System prompt in Dutch for OpenAI
  const systemPrompt = `Je bent een behulpzame assistent voor de Koningsspelen website. 
  Beantwoord alleen vragen over de Koningsspelen in het Nederlands.`;
  
  // Error responses in Dutch
  if (isOffTopic(question)) {
    return "Ik kan alleen vragen over de Koningsspelen beantwoorden.";
  }
}
```

### Content Processing
- Source content: Dutch (from Koningsspelen website)
- Embeddings: Dutch text chunks
- Search queries: Dutch
- Response generation: Dutch

### Error Handling
```typescript
// Technical errors (logs): English
logger.error("Failed to connect to OpenAI API");

// User-facing errors: Dutch
return {
  error: "De chatbot is momenteel niet beschikbaar. Probeer het later opnieuw."
};
```

## Localization Strategy

### Phase 1 (MVP)
- Hardcoded Dutch strings in components
- Simple Dutch responses

### Phase 2 (Future)
- i18n implementation for potential multi-language support
- Centralized translation files
- Language detection

### OpenAI Configuration
```typescript
const openAIConfig = {
  model: "gpt-4",
  language: "nl", // Dutch
  systemPrompt: "Reageer altijd in het Nederlands...",
  temperature: 0.7
};
```

## Quality Assurance

### Dutch Language Quality
- Natural conversation flow
- Proper grammar and spelling
- Appropriate tone (helpful, friendly)
- Cultural context awareness

### Testing Strategy
- Dutch test cases
- Native speaker review
- User acceptance testing with Dutch speakers

## Examples

### Good Implementation
```vue
<template>
  <!-- Dutch UI text -->
  <input 
    :placeholder="'Vraag iets over de Koningsspelen...'" 
    v-model="userInput"
  />
  <button @click="sendMessage">Versturen</button>
</template>

<script setup lang="ts">
// English code and comments
const userInput = ref<string>('');
const isLoading = ref<boolean>(false);

// Function to send message to API
async function sendMessage(): Promise<void> {
  // Implementation in English
}
</script>
```

### API Response Format
```json
{
  "response": "De Koningsspelen vinden plaats op Koningsdag, 27 april...",
  "sources": ["https://koningsspelen.nl/wanneer"],
  "confidence": 0.95,
  "language": "nl"
}
```
