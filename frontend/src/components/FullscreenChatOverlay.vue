<template>
  <div 
    v-if="isVisible" 
    class="fixed inset-0 z-50 bg-white flex flex-col"
    :class="{ 'animate-fade-in': isVisible }"
  >
    <!-- Chat Area - Full height minus button space -->
    <div class="flex-1 flex justify-center px-4 py-4 pb-20">
      <div class="w-full max-w-4xl h-full">
        <ChatWidget />
      </div>
    </div>
    
    <!-- Website Button - Rechtsonder -->
    <button 
      @click="toggleOverlay"
      class="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg transition-colors text-white font-medium shadow-lg"
    >
      Ga naar website →
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ChatWidget from './ChatWidget.vue'

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const toggleOverlay = () => {
  emit('toggle')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
