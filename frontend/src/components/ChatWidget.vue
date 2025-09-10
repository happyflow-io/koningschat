<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
    <div class="bg-blue-600 text-white p-4">
      <h3 class="font-semibold">Koningsspelen Chat</h3>
      <p class="text-sm opacity-90">Stel je vraag over de Koningsspelen</p>
    </div>
    
    <div class="h-80 p-4 overflow-y-auto bg-gray-50">
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
      
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-white border rounded-lg px-4 py-2 max-w-xs">
          <div class="text-xs font-semibold mb-1">Bot</div>
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="border-t bg-white p-4">
      <div class="flex gap-2">
        <input 
          v-model="currentMessage" 
          @keyup.enter="sendMessage"
          :disabled="isLoading"
          placeholder="Stel je vraag over de Koningsspelen..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button 
          @click="sendMessage"
          :disabled="isLoading || !currentMessage.trim()"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verstuur
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '../composables/useChat'

const { messages, currentMessage, isLoading, sendMessage } = useChat()
</script>
