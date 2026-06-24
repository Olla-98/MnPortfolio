<script setup>
// WIJZIGING 1: 'watch' verwijderd, 'onMounted' toegevoegd 
// watch hadden we nodig voor localStorage. Die hebben we niet meer nodig.
// onMounted gebruiken we om taken op te halen zodra de app opstart.
import { ref, computed, onMounted } from 'vue'

// WIJZIGING 2: supabase importeren 
import { supabase } from './supabase.js'

import TaakInput from './components/TaakInput.vue'
import FilterBalk from './components/FilterBalk.vue'
import TaakLijst from './components/TaakLijst.vue'
import AppHeader from './components/AppHeader.vue'

// WIJZIGING 3: taken start nu als lege array 
// Vroeger: taken.value = localStorage lezen (werkte alleen op jouw computer)
// Nu:      taken.value = [] — de echte data komt uit Supabase via onMounted()
const taken = ref([])
const filter = ref('all')
const laden  = ref(true) // nieuw: laad-indicator terwijl we wachten op Supabase
const toast  = ref({ zichtbaar: false, tekst: '' })
let toastTimer = null

// WIJZIGING 4: localStorage watch volledig verwijderd 
// Supabase slaat alles automatisch op. Je hoeft zelf niets meer te bewaren.

// WIJZIGING 5: taken ophalen bij opstarten
// onMounted = wordt uitgevoerd zodra de app in de browser geladen is.
onMounted(async () => {
  const { data, error } = await supabase
    .from('taken')
    .select('*')
    .order('aangemaakt_op', { ascending: false })

  if (error) {
    console.error('Fout bij ophalen taken:', error)
    toonToast('⚠️ Kon taken niet laden')
  } else {
    taken.value = data
  }
  laden.value = false
})

// Computed properties — NIET gewijzigd
const aantalOpen  = computed(() => taken.value.filter(t => !t.klaar).length)
const aantalKlaar = computed(() => taken.value.filter(t =>  t.klaar).length)

const gefilterdeT = computed(() => {
  if (filter.value === 'actief')   return taken.value.filter(t => !t.klaar)
  if (filter.value === 'voltooid') return taken.value.filter(t =>  t.klaar)
  return taken.value
})

// WIJZIGING 6: voegToe is nu async 
// Vroeger: direct in array pushen (alleen lokaal)
// Nu: eerst INSERT naar Supabase, daarna in array zetten
// .select().single() geeft de nieuwe rij terug met de echte database-id (uuid)
async function voegToe(tekst) {
  const { data, error } = await supabase
    .from('taken')
    .insert({ tekst, klaar: false })
    .select()
    .single()

  if (error) { toonToast('⚠️ Toevoegen mislukt'); return }

  taken.value.unshift(data)
  toonToast('✓ Taak toegevoegd')
}

// WIJZIGING 7: toggleKlaar is nu async 
// Vroeger: direct t.klaar omzetten in de array
// Nu: eerst UPDATE naar Supabase, daarna in de array aanpassen
async function toggleKlaar(id) {
  const taak = taken.value.find(t => t.id === id)
  if (!taak) return
  const nieuweStatus = !taak.klaar

  const { error } = await supabase
    .from('taken')
    .update({ klaar: nieuweStatus })
    .eq('id', id) // .eq() = WHERE id = id (alleen déze taak)

  if (error) { toonToast('⚠️ Bijwerken mislukt'); return }

  taak.klaar = nieuweStatus
  if (taak.klaar) toonToast('✓ Taak voltooid!')
}

// WIJZIGING 8: verwijder is nu async 
// Vroeger: direct filteren uit de array
// Nu: eerst DELETE naar Supabase, daarna uit de array verwijderen
async function verwijder(id) {
  const { error } = await supabase
    .from('taken')
    .delete()
    .eq('id', id)

  if (error) { toonToast('⚠️ Verwijderen mislukt'); return }

  taken.value = taken.value.filter(t => t.id !== id)
  toonToast('🗑 Taak verwijderd')
}

// WIJZIGING 9: bewerkSla is nu async 
// Vroeger: tekst direct aanpassen in de array
// Nu: eerst UPDATE naar Supabase, daarna de array bijwerken
async function bewerkSla(id, nieuweTekst) {
  const { error } = await supabase
    .from('taken')
    .update({ tekst: nieuweTekst })
    .eq('id', id)

  if (error) { toonToast('⚠️ Bewerken mislukt'); return }

  const taak = taken.value.find(t => t.id === id)
  if (taak) taak.tekst = nieuweTekst
  toonToast('✏️ Taak bijgewerkt')
}

// WIJZIGING 10: wisVoltooide is nu async
// Vroeger: filteren uit de array
// Nu: alle voltooide id's in één keer naar Supabase sturen via .in()
// .in() = WHERE id IN (id1, id2, ...) — één aanroep voor meerdere rijen
async function wisVoltooide() {
  const ids = taken.value.filter(t => t.klaar).map(t => t.id)
  if (ids.length === 0) return

  const { error } = await supabase
    .from('taken')
    .delete()
    .in('id', ids)

  if (error) { toonToast('⚠️ Wissen mislukt'); return }

  const aantal = ids.length
  taken.value  = taken.value.filter(t => !t.klaar)
  toonToast(`🗑 ${aantal} voltooide ${aantal === 1 ? 'taak' : 'taken'} verwijderd`)
}

// toonToast 
function toonToast(tekst) {
  toast.value = { zichtbaar: true, tekst }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value.zichtbaar = false }, 2200)
}
</script>

<template>
  <div class="app-wrapper">
    <div class="app">

      <AppHeader :aantalOpen="aantalOpen" :aantalKlaar="aantalKlaar" />
      <TaakInput @voegToe="voegToe" />
      <FilterBalk
        :filter="filter"
        :totaal="taken.length"
        :aantalOpen="aantalOpen"
        :aantalKlaar="aantalKlaar"
        @wijzigFilter="filter = $event"
      />

      <!-- WIJZIGING 11: laad-indicator -->
      <!-- v-if="laden" toont 'Taken laden...' terwijl Supabase bezig is -->
      <!-- v-else toont de echte TaakLijst zodra de data er is -->
      <p v-if="laden" class="laad-tekst">Taken laden...</p>
      <TaakLijst
        v-else
        :taken="gefilterdeT"
        :filter="filter"
        @toggle="toggleKlaar"
        @verwijder="verwijder"
        @bewerkSla="bewerkSla"
        @wisVoltooide="wisVoltooide"
        :aantalOpen="aantalOpen"
        :aantalKlaar="aantalKlaar"
      />

    </div>

    <Transition name="toast">
      <div v-if="toast.zichtbaar" class="toast">{{ toast.tekst }}</div>
    </Transition>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:          #0f0f13;
  --surface:     #1a1a23;
  --surface2:    #22222e;
  --surface3:    #2a2a38;
  --accent:      #7c6af7;
  --accent2:     #a78bfa;
  --accent-glow: rgba(124,106,247,0.15);
  --green:       #34d399;
  --green-bg:    rgba(52,211,153,0.1);
  --red:         #f87171;
  --red-bg:      rgba(248,113,113,0.1);
  --text:        #f0eeff;
  --text2:       #9d9ab8;
  --text3:       #5c5a72;
  --border:      rgba(255,255,255,0.07);
  --border2:     rgba(255,255,255,0.12);
  --radius:      16px;
  --radius-sm:   10px;
}

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px 80px;
}

body::before {
  content: '';
  position: fixed;
  top: -200px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(124,106,247,0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.app-wrapper { width: 100%; position: relative; z-index: 1; }

.app {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  animation: fadeUp 0.5s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* WIJZIGING 12: laad-tekst stijl */
.laad-tekst {
  text-align: center;
  color: var(--text3);
  font-size: 14px;
  padding: 32px 0;
}

.toast {
  position: fixed;
  bottom: 32px; left: 50%;
  transform: translateX(-50%);
  background: var(--surface3);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 10px 22px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  z-index: 999;
  white-space: nowrap;
}

.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-enter-from,  .toast-leave-to      { opacity: 0; transform: translateX(-50%) translateY(16px); }

@media (max-width: 480px) {
  body { padding: 24px 12px 60px; }
}
</style>