<!-- lege staat per filter -->
 <script setup>
import { computed } from 'vue'

const props = defineProps({
  filter: { type: String, required: true },
})

const inhoud = computed(() => ({
  all:      { icoon: '📋', titel: 'Nog geen taken',     tekst: 'Voeg je eerste taak toe hierboven!' },
  actief:   { icoon: '✅', titel: 'Alles klaar!',       tekst: 'Je hebt geen open taken meer. Goed gedaan!' },
  voltooid: { icoon: '📝', titel: 'Nog niets voltooid', tekst: 'Ga aan de slag en vink je eerste taak af!' },
}[props.filter]))
</script>

<template>
  <div class="lege-staat">
    <span class="icoon">{{ inhoud.icoon }}</span>
    <p class="titel">{{ inhoud.titel }}</p>
    <p class="tekst">{{ inhoud.tekst }}</p>
  </div>
</template>

<style scoped>
.lege-staat {
  text-align: center;
  padding: 48px 24px;
  color: var(--text3);
}

.icoon  { font-size: 42px; display: block; margin-bottom: 14px; }
.titel  { font-size: 16px; font-weight: 600; color: var(--text2); margin-bottom: 6px; }
.tekst  { font-size: 14px; line-height: 1.6; }
</style>
