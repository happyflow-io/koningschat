<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-orange-600 mb-2">Inschrijven Koningsspelen</h1>
      <p class="text-center text-gray-600 mb-8">Meld je school aan voor de Koningsspelen 2026</p>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-orange-600 mb-4">📝 Inschrijving</h2>
        <p class="text-gray-700 mb-6">
          Inschrijving voor de Koningsspelen 2026 is vanaf januari 2026 mogelijk. 
          Alle basisscholen in Nederland kunnen gratis deelnemen.
        </p>
        
        <div class="bg-orange-50 p-6 rounded-lg mb-6">
          <h3 class="font-bold text-orange-800 mb-3">Wat krijgt je school?</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>Gratis Sport- en Feestpakket</li>
            <li>Digitale lesmateriaal</li>
            <li>Certificaat voor deelname</li>
            <li>Toegang tot online platform</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 class="font-bold text-blue-800 mb-3">Belangrijke data</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>Inschrijving start: Januari 2026</li>
            <li>Inschrijving sluit: Maart 2026</li>
            <li>Koningsspelen: Vrijdag 17 april 2026</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-xl font-bold mb-4">Vragen over inschrijving?</h2>
        <p class="text-gray-600 mb-4">
          Onze chatbot kan al je vragen over het inschrijfproces beantwoorden!
        </p>
        <p class="text-sm text-gray-500">
          💬 Vraag bijvoorbeeld: "Hoe schrijf ik mijn school in?" of "Wat kost deelname?"
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>
