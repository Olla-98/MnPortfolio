<!-- lijst + footer + animaties -->
 <script setup>
import TaakItem from './TaakItem.vue'
import LegeStaat from './LegeStaat.vue'

defineProps({
  taken:       { type: Array,  required: true },
  filter:      { type: String, required: true },
  aantalOpen:  { type: Number, required: true },
  aantalKlaar: { type: Number, required: true },
})

defineEmits(['toggle', 'verwijder', 'bewerkSla', 'wisVoltooide'])
</script>

<template>
  <section>
    <p class="sectie-label">
      {{ filter === 'all' ? 'Alle taken' : filter === 'actief' ? 'Nog te doen' : 'Voltooid' }}
    </p>

    <!-- Takenlijst -->
    <TransitionGroup name="taak" tag="div" class="taak-lijst">
      <TaakItem
        v-for="taak in taken"
        :key="taak.id"
        :taak="taak"
        @toggle="$emit('toggle', taak.id)"
        @verwijder="$emit('verwijder', taak.id)"
        @bewerkSla="(tekst) => $emit('bewerkSla', taak.id, tekst)"
      />
    </TransitionGroup>

    <!-- Lege staat -->
    <LegeStaat v-if="taken.length === 0" :filter="filter" />

    <!-- Footer balk -->
    <div class="footer-balk">
      <span class="footer-tekst">
        {{ aantalOpen === 0 && (aantalOpen + aantalKlaar) > 0
            ? '🎉 Alles klaar!'
            : `${aantalOpen} ${aantalOpen === 1 ? 'taak' : 'taken'} nog te doen` }}
      </span>
      <button
        class="wis-knop"
        :disabled="aantalKlaar === 0"
        @click="$emit('wisVoltooide')"
      >
        Voltooide verwijderen
      </button>
    </div>
  </section>
</template>

<style scoped>
.sectie-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 8px;
  padding: 0 4px;
}

.taak-lijst { display: flex; flex-direction: column; gap: 8px; min-height: 40px; }

/* TransitionGroup animaties */
.taak-enter-active { animation: schuifIn .25s ease both; }
.taak-leave-active { animation: schuifIn .2s ease reverse both; }
.taak-move         { transition: transform .25s ease; }

@keyframes schuifIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

.footer-balk {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.footer-tekst { font-size: 13px; color: var(--text3); }

.wis-knop {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text3);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all .15s;
}

.wis-knop:hover    { color: var(--red); background: var(--red-bg); }
.wis-knop:disabled { opacity: .3; pointer-events: none; }
</style>
