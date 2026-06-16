<script setup>
import { ref, computed, watch } from 'vue'
import TaakInput from './components/TaakInput.vue'
import FilterBalk from './components/FilterBalk.vue'
import TaakLijst from './components/TaakLijst.vue'
import AppHeader from './components/AppHeader.vue'

// State en reactieve variabelen
const taken = ref(JSON.parse(localStorage.getItem('taken-v1') || '[]'))
const filter = ref('all')
const toast  = ref({ zichtbaar: false, tekst: '' })
let toastTimer = null

//  LocalStorage synchronisatie  
watch(taken, (nieuw) => {
  localStorage.setItem('taken-v1', JSON.stringify(nieuw))
}, { deep: true })

//  Computed properties betekenten dat deze waarden automatisch worden bijgewerkt wanneer de onderliggende data verandert. 
const aantalOpen = computed(() => taken.value.filter(t => !t.klaar).length)
const aantalKlaar = computed(() => taken.value.filter(t => t.klaar).length)

const gefilterdeT = computed(() => {
  if (filter.value === 'actief')   return taken.value.filter(t => !t.klaar)
  if (filter.value === 'voltooid') return taken.value.filter(t => t.klaar)
  return taken.value
})

// Actions 
function voegToe(tekst) {
  taken.value.unshift({ id: Date.now(), tekst, klaar: false })
  toonToast('✓ Taak toegevoegd')
}

function toggleKlaar(id) {
  const t = taken.value.find(t => t.id === id)
  if (!t) return
  t.klaar = !t.klaar
  if (t.klaar) toonToast('✓ Taak voltooid!')
}

function verwijder(id) {
  taken.value = taken.value.filter(t => t.id !== id)
  toonToast('🗑 Taak verwijderd')
}

function bewerkSla(id, nieuweTekst) {
  const t = taken.value.find(t => t.id === id)
  if (t) t.tekst = nieuweTekst
  toonToast('✏️ Taak bijgewerkt')
}

function wisVoltooide() {
  const aantal = taken.value.filter(t => t.klaar).length
  taken.value = taken.value.filter(t => !t.klaar)
  toonToast(`🗑 ${aantal} voltooide ${aantal === 1 ? 'taak' : 'taken'} verwijderd`)
}

function toonToast(tekst) {
  toast.value = { zichtbaar: true, tekst }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value.zichtbaar = false }, 2200)
}
</script>

<template>
  <div class="app-wrapper">
    <div class="app">

      <AppHeader
        :aantalOpen="aantalOpen"
        :aantalKlaar="aantalKlaar"
      />

      <TaakInput @voegToe="voegToe" />

      <FilterBalk
        :filter="filter"
        :totaal="taken.length"
        :aantalOpen="aantalOpen"
        :aantalKlaar="aantalKlaar"
        @wijzigFilter="filter = $event"
      />

      <TaakLijst
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

    <!-- Toast melding -->
    <Transition name="toast">
      <div v-if="toast.zichtbaar" class="toast">
        {{ toast.tekst }}
      </div>
    </Transition>
  </div>
</template>

<style>
/*  Global reset & variabelen  */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:           #0f0f13;
  --surface:      #1a1a23;
  --surface2:     #22222e;
  --surface3:     #2a2a38;
  --accent:       #7c6af7;
  --accent2:      #a78bfa;
  --accent-glow:  rgba(124,106,247,0.15);
  --green:        #34d399;
  --green-bg:     rgba(52,211,153,0.1);
  --red:          #f87171;
  --red-bg:       rgba(248,113,113,0.1);
  --text:         #f0eeff;
  --text2:        #9d9ab8;
  --text3:        #5c5a72;
  --border:       rgba(255,255,255,0.07);
  --border2:      rgba(255,255,255,0.12);
  --radius:       16px;
  --radius-sm:    10px;
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

/* Toast */
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
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

@media (max-width: 480px) {
  body { padding: 24px 12px 60px; }
}
</style>
