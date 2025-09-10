<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
    <!-- Header with Koningsspelen branding -->
    <div class="bg-orange-500 text-white p-4">
      <h3 class="font-semibold">Koningsspelen Assistent</h3>
      <p class="text-sm opacity-90">Stel je vraag over de Koningsspelen</p>
    </div>
    
    <!-- Messages area -->
    <div class="h-80 p-4 overflow-y-auto bg-gray-50" ref="messagesContainer">
      <!-- Welcome message with suggestions -->
      <div v-if="messages.length === 0" class="text-center text-gray-600 mt-4">
        <p class="mb-4">Welkom! Probeer een van deze vragen:</p>
        <div class="space-y-2 text-sm">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            @click="sendSuggestion(suggestion)"
            class="block w-full text-left p-2 bg-white hover:bg-gray-100 rounded border text-gray-700 transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- Chat messages -->
      <div v-for="message in messages" :key="message.id" class="mb-4">
        <div :class="message.sender === 'Jij' ? 'flex justify-end' : 'flex justify-start'">
          <div :class="message.sender === 'Jij' 
            ? 'bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs' 
            : 'bg-white border rounded-lg px-4 py-2 max-w-xs'">
            <div class="text-xs font-semibold mb-1">{{ message.sender }}</div>
            <div v-if="message.sender === 'Bot'" v-html="formatResponseWithLink(message.text, message.sources)"></div>
            <div v-else>{{ message.text }}</div>
          </div>
        </div>
      </div>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-white border rounded-lg px-4 py-2 max-w-xs">
          <div class="text-xs font-semibold mb-1">Bot</div>
          <div class="flex items-center space-x-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
            <span class="text-gray-600 text-sm">Aan het denken...</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Input area -->
    <div class="border-t bg-white p-4">
      <div class="flex gap-2">
        <input 
          v-model="currentMessage" 
          @keyup.enter="sendMessage"
          :disabled="isLoading"
          placeholder="Vraag iets over de Koningsspelen..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        />
        <button 
          @click="sendMessage"
          :disabled="isLoading || !currentMessage.trim()"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verstuur
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2 text-center">
        Powered by AI • Informatie van koningsspelen.nl
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useChat } from '../composables/useChat'

const { messages, currentMessage, isLoading, sendMessage: sendChatMessage } = useChat()
const messagesContainer = ref<HTMLElement>()

const suggestions = [
  'Wanneer zijn de Koningsspelen?',
  'Wat krijgen scholen bij inschrijving?',
  'Wat is het thema dit jaar?',
  'Hoe werkt het Koningsontbijt?'
]

const formatResponseWithLink = (text: string, sources?: Array<{title: string, url: string}>) => {
  if (!sources || sources.length === 0) return text
  
  // Add link at the end of the response
  const mainSource = sources[0]
  return `${text} <a href="${mainSource.url}" target="_blank" class="text-orange-600 hover:text-orange-800 underline">→ Meer info</a>`
}

const sendSuggestion = async (suggestion: string) => {
  currentMessage.value = suggestion
  await sendMessage()
}

const sendMessage = async () => {
  await sendChatMessage()
  
  // Scroll to bottom after message
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>
