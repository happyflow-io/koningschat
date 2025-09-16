<template>
  <OverlayManager>
    <template #website-content>
      <router-view />
    </template>
  </OverlayManager>
</template>

<script setup lang="ts">
import OverlayManager from './components/OverlayManager.vue'
</script>
