<script setup>
import { ref } from 'vue'
// De ref functie maakt een reactive reference aan, die we kunnen gebruiken om de state van onze app bij te houden.
// ref() maakt een variabele "reactief" — als de data verandert, update Vue automatisch de pagina. Zonder ref() ziet Vue de wijzigingen niet.

const taken = ref([
  {id: 1, tekst: 'Eerste taak', voltooid: false},
  {id: 2, tekst: 'Tweede taak', voltooid: false},
])

// Variabele voor het input veld, zodat we de waarde kunnen binden en bijhouden wat de gebruiker invoert.
const nieuweTaak = ref('')

function voegTaakAan() {
  // Doe niets als het input veld leeg is
  if (!nieuweTaak.value.trim()) return 

  // Voeg een nieuwe taak toe aan de takenlijst met een uniek ID, de tekst van het input veld, en een voltooid status van false.
  taken.value.push({
    id: Date.now(), // Uniek ID gebaseerd op de huidige tijd
    tekst: nieuweTaak.value, // De tekst van de nieuwe taak
    voltooid: false // Nieuwe taken zijn standaard niet voltooid
  })

  // Maak het veld leeg na toevoegen van de taak
  nieuweTaak.value = ''
}
// Deze functie verandert de voltooid status van een taak. Als de taak voltooid is, wordt deze niet voltooid. 
function toggleVoltooid(taak) {
  taak.voltooid = !taak.voltooid 
}
</script>

<template>
  <header>
      <h1> To-Do App </h1>
  </header>


    <!-- <ul> -->
      <!-- We gebruiken v-for om door onze taken te itereren en ze weer te geven in een lijst. -->
      <!-- <li v-for="taak in taken" :key="taak.id">
        {{ taak.tekst }}
      </li>
    </ul> -->

    <!-- <ul> -->
     
      <!-- v-for herhaalt HTML voor elk item in een lijst. -->
      <!-- <li v-for="taak in taken" :key="taak.id">
        {{ taak.tekst }} - {{ taak.voltooid ? 'voltooid' : 'niet voltooid' }}
      </li>
     </ul> -->
    

     <h2>Mijn Taken</h2>
    <!-- v-for loopt door alle taken  en toont de tekst van elke taak, samen met een indicatie of de taak voltooid is of niet. -->
    <div>
    <!-- Input + knop -->
    <input v-model="nieuweTaak" placeholder="Nieuwe taak...">
    <button @click="voegTaakAan">Voeg toe</button> <!-- @click is een event listener die de functie voegTaakAan aanroept wanneer de knop wordt geklikt. -->
    
  </div>
<!-- v-for herhaalt deze div voor elke taak in de takenlijst, waarbij de tekst en voltooid status van elke taak worden weergegeven. -->
    
    <div 
    v-for="taak in taken" 
    :key="taak.id"
    @click="toggleVoltooid(taak)">
  <span :class="{ 'klaar': taak.voltooid }">
    {{ taak.tekst }}
  </span>
    </div>
 
 
</template>

<style scoped>
header {
  line-height: 1.5;
  color: var(--section-gap);
}

.klaar {
  text-decoration: line-through;
  opacity: 0.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
