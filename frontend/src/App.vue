<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-2">Koningschat</h1>
      <p class="text-center text-gray-600 mb-8">RAG Chatbot voor Koningsspelen</p>
      
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="h-96 p-4 overflow-y-auto bg-gray-50">
          <div v-for="message in messages" :key="message.id" class="mb-4">
            <div :class="message.sender === 'Jij' ? 'flex justify-end' : 'flex justify-start'">
              <div :class="message.sender === 'Jij' 
                ? 'bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs' 
                : 'bg-white border rounded-lg px-4 py-2 max-w-xs'">
                <div class="text-xs font-semibold mb-1">{{ message.sender }}</div>
                <div>{{ message.text }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t bg-white p-4">
          <div class="flex gap-2">
            <input 
              v-model="currentMessage" 
              @keyup.enter="sendMessage"
              placeholder="Stel een vraag over Koningsspelen..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              @click="sendMessage"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verstuur
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  id: number
  sender: string
  text: string
}

const messages = ref<Message[]>([
  { id: 1, sender: 'Bot', text: 'Hallo! Ik kan vragen beantwoorden over Koningsspelen.' }
])

const currentMessage = ref('')

const sendMessage = async () => {
  if (!currentMessage.value.trim()) return
  
  // Add user message
  messages.value.push({
    id: Date.now(),
    sender: 'Jij',
    text: currentMessage.value
  })
  
  try {
    // Call Hono backend
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: currentMessage.value })
    })
    
    const data = await response.json()
    
    messages.value.push({
      id: Date.now() + 1,
      sender: 'Bot',
      text: data.response
    })
  } catch (error) {
    messages.value.push({
      id: Date.now() + 1,
      sender: 'Bot',
      text: 'Sorry, er ging iets mis met de verbinding.'
    })
  }
  
  currentMessage.value = ''
}
</script>
