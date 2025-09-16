<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-center text-purple-600 mb-2">Contact Koningsspelen</h1>
        <p class="text-center text-gray-600 mb-8">Neem contact met ons op</p>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-purple-600 mb-4">📞 Contactgegevens</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-bold text-purple-800 mb-2">📧 E-mail</h3>
              <p class="text-gray-700">info@koningsspelen.nl</p>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">📱 Telefoon</h3>
              <p class="text-gray-700">030 - 123 4567</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-bold text-green-800 mb-2">🏢 Adres</h3>
              <p class="text-gray-700">Koningslaan 123<br>3500 AB Utrecht</p>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg">
              <h3 class="font-bold text-orange-800 mb-2">🕒 Openingstijden</h3>
              <p class="text-gray-700">Ma-Vr: 09:00 - 17:00</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-bold mb-4">❓ Veelgestelde vragen</h2>
          <p class="text-gray-600 mb-4">
            Veel vragen worden al beantwoord door onze chatbot. Probeer eerst daar je vraag te stellen!
          </p>
          <p class="text-sm text-gray-500">
            💬 Veelgestelde onderwerpen: inschrijving, kosten, activiteiten, data
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>
