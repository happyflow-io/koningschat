<template>
  <div>
    <!-- Website Content Slot -->
    <div :class="{ 'pointer-events-none': isOverlayVisible }">
      <slot name="website-content"></slot>
    </div>

    <!-- Fullscreen Chat Overlay -->
    <FullscreenChatOverlay 
      :is-visible="isOverlayVisible"
      @toggle="toggleOverlay"
    />

    <!-- Toggle Button (when overlay is hidden) -->
    <ToggleButton 
      :is-overlay-visible="isOverlayVisible"
      @toggle="toggleOverlay"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FullscreenChatOverlay from './FullscreenChatOverlay.vue'
import ToggleButton from './ToggleButton.vue'

const isOverlayVisible = ref(true) // Start with chat overlay visible

const toggleOverlay = () => {
  isOverlayVisible.value = !isOverlayVisible.value
  
  // Save state to localStorage
  localStorage.setItem('koningschat-overlay-visible', String(isOverlayVisible.value))
}

// Check if user has previously hidden the overlay
onMounted(() => {
  const savedState = localStorage.getItem('koningschat-overlay-visible')
  if (savedState !== null) {
    isOverlayVisible.value = savedState === 'true'
  }
})
</script>
