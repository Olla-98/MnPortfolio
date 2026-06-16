<script setup>
import { ref } from 'vue'

const props = defineProps({
  taak: { type: Object, required: true },
})

const emit = defineEmits(['toggle', 'verwijder', 'bewerkSla'])

const bewerkModus = ref(false)
const bewerkTekst = ref('')

function startBewerken() {
  bewerkTekst.value = props.taak.tekst
  bewerkModus.value = true
}

function slaOp() {
  const tekst = bewerkTekst.value.trim()
  if (!tekst) return
  emit('bewerkSla', tekst)
  bewerkModus.value = false
}

function annuleer() {
  bewerkModus.value = false
}
</script>

<template>
  <div class="taak-item" :class="{ klaar: taak.klaar, bewerken: bewerkModus }">

    <!-- Vinkje -->
    <button
      class="vink-knop"
      :class="{ gedaan: taak.klaar }"
      :aria-label="taak.klaar ? 'Markeer als open' : 'Markeer als klaar'"
      @click="$emit('toggle')"
    >
      <span v-if="taak.klaar">✓</span>
    </button>

    <!-- Tekst / edit input -->
    <div class="taak-inhoud">
      <input
        v-if="bewerkModus"
        v-model="bewerkTekst"
        class="bewerk-invoer"
        @keydown.enter="slaOp"
        @keydown.escape="annuleer"
        v-focus
      />
      <span v-else class="taak-tekst">{{ taak.tekst }}</span>
    </div>

    <!-- Actie knoppen -->
    <div class="acties">
      <template v-if="bewerkModus">
        <button class="actie-knop opslaan" title="Opslaan" @click="slaOp">✓</button>
        <button class="actie-knop annuleer" title="Annuleren" @click="annuleer">✕</button>
      </template>
      <template v-else>
        <button class="actie-knop bewerk" title="Bewerken" @click="startBewerken">✏️</button>
        <button class="actie-knop verwijder" title="Verwijderen" @click="$emit('verwijder')">🗑</button>
      </template>
    </div>

  </div>
</template>

<!-- v-focus directive: focust het input automatisch bij bewerken -->
<script>
export default {
  directives: {
    focus: {
      mounted(el) { el.focus(); el.select() }
    }
  }
}
</script>

<style scoped>
.taak-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 13px 14px;
  transition: all .2s;
}

.taak-item:hover         { background: var(--surface2); border-color: var(--border2); }
.taak-item.klaar         { opacity: .55; }
.taak-item.bewerken      { border-color: rgba(124,106,247,.5); background: var(--surface2); }

/* Vinkje */
.vink-knop {
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border2);
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: transparent;
  font-size: 11px;
  transition: all .2s;
}

.vink-knop:hover         { border-color: var(--green); background: var(--green-bg); color: var(--green); }
.vink-knop.gedaan        { background: var(--green); border-color: var(--green); color: white; }

/* Tekst */
.taak-inhoud { flex: 1; min-width: 0; }

.taak-tekst {
  font-size: 15px;
  color: var(--text);
  word-break: break-word;
}

.taak-item.klaar .taak-tekst { text-decoration: line-through; color: var(--text3); }

.bewerk-invoer {
  width: 100%;
  background: var(--surface3);
  border: 1px solid rgba(124,106,247,.5);
  border-radius: 6px;
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  padding: 4px 8px;
  outline: none;
}

/* Acties */
.acties {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity .2s;
  flex-shrink: 0;
}

.taak-item:hover .acties,
.taak-item.bewerken .acties { opacity: 1; }

.actie-knop {
  width: 30px; height: 30px;
  border-radius: 8px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  color: var(--text3);
  transition: all .15s;
}

.actie-knop:hover         { background: var(--surface3); color: var(--text); }
.actie-knop.verwijder:hover { background: var(--red-bg); color: var(--red); }
.actie-knop.opslaan:hover   { background: var(--green-bg); color: var(--green); }
.actie-knop.annuleer:hover  { background: var(--red-bg); color: var(--red); }

@media (max-width: 480px) {
  .acties { opacity: 1; }
}
</style>
