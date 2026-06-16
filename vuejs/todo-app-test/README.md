# 📋 Todo App — Keuzedeel Vue.js

Een moderne, volledig functionele Todo App gebouwd met Vue 3 en de Composition API.

## 🚀 Starten

```bash
npm install
npm run dev
```

## 📁 Projectstructuur

```
src/
├── main.js                   # Startpunt van de app
├── App.vue                   # Hoofdcomponent + state management
├── assets/
│   └── fonts.css             # Google Fonts import
└── components/
    ├── AppHeader.vue         # Titel, datum en stat-pills
    ├── TaakInput.vue         # Invoerveld + toevoeg-knop
    ├── FilterBalk.vue        # Tabs: Alle / Actief / Voltooid
    ├── TaakLijst.vue         # Lijst van taken + footer
    ├── TaakItem.vue          # Één taak (toggle, bewerken, verwijderen)
    └── LegeStaat.vue         # Lege staat per filter
```

## ✅ Functionaliteiten

- Taken toevoegen via knop of Enter-toets
- Taken afvinken als voltooid
- Taken bewerken (inline, opslaan met Enter of ✓)
- Taken verwijderen
- Filteren op Alle / Actief / Voltooid
- Teller van open en voltooide taken
- Alle voltooide taken in één klik wissen
- Taken worden bewaard in `localStorage`
- Responsive voor mobiel
- Toast-melding na elke actie

## 🛠 Gebruikte technologie

| Tech | Waarvoor |
|---|---|
| Vue 3 | Frontend framework |
| Composition API (`<script setup>`) | State en logica |
| Vite | Build tool / dev server |
| localStorage + `watch()` | Data bewaren |
| CSS variabelen + scoped styles | Styling per component |
