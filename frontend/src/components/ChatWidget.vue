<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full relative">
    <!-- Header -->
    <div class="bg-orange-500 text-white p-4">
      <h3 class="font-semibold text-lg">Koningsspelen Assistent</h3>
      <p class="text-orange-100 text-sm">Stel je vraag over de Koningsspelen</p>
    </div>

    <!-- Messages - With bottom padding for input -->
    <div class="absolute top-20 bottom-24 left-0 right-0 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div v-if="messages.length === 0" class="text-center text-gray-500 mt-8">
        <p class="mb-4">Welkom! Probeer een van deze vragen:</p>
        <div class="space-y-2 text-sm">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            @click="sendMessage(suggestion)"
            class="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-700 transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- Chat messages -->
      <div v-for="message in messages" :key="message.id" class="mb-4">
        <!-- User Message - Rechts, blauwe achtergrond -->
        <div v-if="message.sender === 'Jij'" class="flex justify-end">
          <div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
            {{ message.text }}
          </div>
        </div>

        <!-- Bot Message - Links, grijze achtergrond -->
        <div v-if="message.sender === 'Bot'" class="flex justify-start">
          <div class="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
            <p v-html="formatResponseWithLink(message.text, message.sources)"></p>
          </div>
        </div>
      </div>

      <!-- Loading State - Links -->
      <div v-if="isLoading" class="flex justify-start mb-4">
        <div class="bg-gray-100 p-3 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
            <span class="text-gray-600 text-sm">Aan het denken...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input area - Absolutely positioned at bottom -->
    <div class="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
      <div class="flex gap-2">
        <input 
          ref="inputField"
          v-model="currentMessage" 
          @keyup.enter="sendMessage()"
          :disabled="isLoading"
          placeholder="Vraag iets over de Koningsspelen..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        />
        <button 
          @click="sendMessage()"
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
import { ref, nextTick, watch, onMounted } from 'vue'
import { useChat } from '../composables/useChat'

const { messages, currentMessage, isLoading, sendMessage: sendChatMessage } = useChat()
const messagesContainer = ref<HTMLElement>()
const inputField = ref<HTMLInputElement>()

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

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const sendMessage = async (text?: string) => {
  if (text) {
    currentMessage.value = text
  }
  
  await sendChatMessage()
  scrollToBottom()
  
  // Focus input field after sending
  nextTick(() => {
    inputField.value?.focus()
  })
}

// Auto-focus input field when component mounts
onMounted(() => {
  nextTick(() => {
    inputField.value?.focus()
  })
})

// Auto-scroll when messages change
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

// Auto-scroll when loading state changes
watch(isLoading, () => {
  scrollToBottom()
})
</script>
