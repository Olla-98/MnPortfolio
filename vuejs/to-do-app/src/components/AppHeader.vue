<!-- titel, datum, stat-pills -->
<script setup>
const dagen  = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag']
const maanden = ['januari','februari','maart','april','mei','juni','juli',
                 'augustus','september','oktober','november','december']
const nu = new Date()
const datumTekst = `${dagen[nu.getDay()]} ${nu.getDate()} ${maanden[nu.getMonth()]} ${nu.getFullYear()}`

defineProps({
  aantalOpen:  { type: Number, required: true },
  aantalKlaar: { type: Number, required: true },
})
</script>

<template>
  <header class="app-header">
    <div class="header-top">
      <h1 class="app-titel">Takenlijst</h1>
    </div>
    <p class="datum">{{ datumTekst }}</p>
    <div class="stat-rij">
      <span class="stat-pill open">{{ aantalOpen }} open</span>
      <span class="stat-pill klaar">{{ aantalKlaar }} klaar</span>
    </div>
  </header>
</template>

<style scoped>
.app-header  { margin-bottom: 28px; }

.app-titel {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #f0eeff 0%, var(--accent2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.datum {
  font-size: 13px;
  color: var(--text3);
  margin-top: 4px;
}

.stat-rij   { display: flex; gap: 8px; margin-top: 14px; }

.stat-pill {
  padding: 5px 14px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--border);
}

.stat-pill.open  { background: var(--accent-glow); border-color: rgba(124,106,247,.3); color: var(--accent2); }
.stat-pill.klaar { background: var(--green-bg);    border-color: rgba(52,211,153,.2);  color: var(--green); }
</style>
