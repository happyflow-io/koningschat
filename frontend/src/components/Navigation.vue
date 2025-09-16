<template>
  <nav class="bg-white shadow-lg mb-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link to="/" class="text-xl font-bold text-blue-600 hover:text-blue-800">
          🇳🇱 Koningsspelen
        </router-link>
        
        <div class="flex space-x-4">
          <router-link 
            to="/" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="route.path === '/' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'"
          >
            Home
          </router-link>
          <router-link 
            to="/inschrijven" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="route.path === '/inschrijven' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-orange-600'"
          >
            Inschrijven
          </router-link>
          <router-link 
            to="/activiteiten" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="route.path === '/activiteiten' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'"
          >
            Activiteiten
          </router-link>
          <router-link 
            to="/contact" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="route.path === '/contact' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'"
          >
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
