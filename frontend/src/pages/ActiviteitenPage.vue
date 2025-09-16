<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-green-600 mb-2">Activiteiten Koningsspelen</h1>
      <p class="text-center text-gray-600 mb-8">Ontdek alle sporten en activiteiten</p>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-green-600 mb-4">🏃‍♀️ Sportactiviteiten</h2>
        <p class="text-gray-700 mb-6">
          De Koningsspelen bieden een breed scala aan sportactiviteiten voor alle leeftijden.
          Het thema voor 2026 is "TWIST - Bewegen met een draai".
        </p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-bold text-green-800 mb-2">🤸‍♀️ Gymnastiek</h3>
            <p class="text-gray-700">Rollen, springen en balanceren</p>
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-blue-800 mb-2">⚽ Voetbal</h3>
            <p class="text-gray-700">Dribbelen, passen en scoren</p>
          </div>
          
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold text-yellow-800 mb-2">🏃‍♂️ Atletiek</h3>
            <p class="text-gray-700">Rennen, springen en werpen</p>
          </div>
          
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-bold text-purple-800 mb-2">🏐 Volleybal</h3>
            <p class="text-gray-700">Slaan, verdedigen en aanvallen</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-xl font-bold mb-4">🎉 Extra Activiteiten</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>Koningsontbijt voor alle deelnemers</li>
          <li>Muziek en dans workshops</li>
          <li>Gezonde tussendoortjes</li>
          <li>Prijsuitreiking en certificaten</li>
        </ul>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-xl font-bold mb-4">Vragen over activiteiten?</h2>
        <p class="text-gray-600 mb-4">
          Vraag onze chatbot naar specifieke sporten of activiteiten!
        </p>
        <p class="text-sm text-gray-500">
          💬 Probeer: "Welke sporten zijn er?" of "Wat is het Koningsontbijt?"
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>
