<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-2">Koningschat Demo</h1>
      <p class="text-center text-gray-600 mb-8">RAG Chatbot Widget voor Koningsspelen</p>
      
      <div class="flex justify-center">
        <ChatWidget />
      </div>
      
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>Dit is een demo van de Koningschat widget.</p>
        <p>De widget kan geïntegreerd worden in elke website.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatWidget from './components/ChatWidget.vue'
</script>
