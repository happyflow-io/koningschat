<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-2">Koningsspelen Website</h1>
        <p class="text-center text-gray-600 mb-8">Officiële website van de Koningsspelen</p>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-orange-600 mb-4">🇳🇱 Koningsspelen 2026</h2>
          <p class="text-gray-700 mb-4">
            De Koningsspelen zijn het grootste sportfeest van Nederland. Elk jaar doen meer dan 1 miljoen kinderen mee aan dit geweldige evenement.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div class="bg-orange-50 p-4 rounded-lg">
              <h3 class="font-bold text-orange-800 mb-2">📅 Belangrijke datum</h3>
              <p class="text-gray-700">Vrijdag 17 april 2026</p>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">🎁 Voor scholen</h3>
              <p class="text-gray-700">Gratis Sport- en Feestpakket bij inschrijving</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-bold text-green-800 mb-2">🏃‍♀️ Deelname</h3>
              <p class="text-gray-700">Alle basisscholen kunnen gratis meedoen</p>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-bold text-purple-800 mb-2">🎯 Thema 2026</h3>
              <p class="text-gray-700">TWIST - Bewegen met een draai</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-bold mb-4">Meer informatie nodig?</h2>
          <p class="text-gray-600 mb-4">
            Gebruik onze chatbot voor directe antwoorden op al je vragen over de Koningsspelen!
          </p>
          <p class="text-sm text-gray-500">
            💬 Klik op de chat knop rechtsonder om te beginnen
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>
