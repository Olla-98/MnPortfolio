<!-- tabs Alle / Actief / Voltooid -->

<script setup>
defineProps({
  filter:      { type: String,  required: true },
  totaal:      { type: Number,  required: true },
  aantalOpen:  { type: Number,  required: true },
  aantalKlaar: { type: Number,  required: true },
})

defineEmits(['wijzigFilter'])

const tabs = [
  { sleutel: 'all',       label: 'Alle' },
  { sleutel: 'actief',    label: 'Actief' },
  { sleutel: 'voltooid',  label: 'Voltooid' },
]
</script>

<template>
  <nav class="filter-balk" aria-label="Filter taken">
    <button
      v-for="tab in tabs"
      :key="tab.sleutel"
      class="filter-knop"
      :class="{ actief: filter === tab.sleutel }"
      @click="$emit('wijzigFilter', tab.sleutel)"
    >
      {{ tab.label }}
      <span class="badge">
        {{ tab.sleutel === 'all' ? totaal : tab.sleutel === 'actief' ? aantalOpen : aantalKlaar }}
      </span>
    </button>
  </nav>
</template>

<style scoped>
.filter-balk {
  display: flex;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 4px;
  margin-bottom: 14px;
}

.filter-knop {
  flex: 1;
  padding: 8px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--text3);
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
}

.filter-knop:hover { color: var(--text2); background: var(--surface2); }

.filter-knop.actief {
  background: var(--surface3);
  color: var(--text);
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
}

.badge {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 7px;
  background: var(--accent-glow);
  color: var(--accent2);
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
}
</style>
