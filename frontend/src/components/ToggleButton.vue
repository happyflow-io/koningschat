<template>
  <button
    v-if="!isOverlayVisible"
    @click="toggleOverlay"
    class="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
    title="Open Koningsspelen Chat"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
    <span class="font-medium">Chat met King-GPT</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isOverlayVisible: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const toggleOverlay = () => {
  emit('toggle')
}
</script>
