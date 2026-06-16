<!-- taak invoer -->
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['voegToe'])
const invoer = ref('')

function verstuur() {
  const tekst = invoer.value.trim()
  if (!tekst) return
  emit('voegToe', tekst)
  invoer.value = ''
}
</script>

<template>
  <div class="invoer-kaart">
    <div class="plus-icoon">+</div>
    <input
      v-model="invoer"
      class="tekst-invoer"
      type="text"
      placeholder="Voeg een nieuwe taak toe..."
      autocomplete="off"
      @keydown.enter="verstuur"
    />
    <button class="toevoeg-knop" @click="verstuur">Toevoegen</button>
  </div>
</template>

<style scoped>
.invoer-kaart {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 14px;
  transition: border-color .2s, box-shadow .2s;
}

.invoer-kaart:focus-within {
  border-color: rgba(124,106,247,.5);
  box-shadow: 0 0 0 3px rgba(124,106,247,.08);
}

.plus-icoon {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--accent-glow);
  border: 1px dashed rgba(124,106,247,.4);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent2);
  font-size: 18px;
  flex-shrink: 0;
}

.tekst-invoer {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  caret-color: var(--accent2);
}

.tekst-invoer::placeholder { color: var(--text3); }

.toevoeg-knop {
  padding: 8px 18px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background .2s, transform .15s;
}

.toevoeg-knop:hover  { background: var(--accent2); transform: translateY(-1px); }
.toevoeg-knop:active { transform: translateY(0); }
</style>
