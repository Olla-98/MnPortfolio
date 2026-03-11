import { state } from "./state.js";

export function renderMetrics() { // Metrics bijwerken op basis van huidige state
  document.getElementById("totalUsers").textContent = state.users.length; // Totaal aantal gebruikers

  const cities = new Set(state.users.map(u => u.city)); // Unieke steden tellen
  document.getElementById("uniqueCities").textContent = cities.size; // Aantal unieke steden

  document.getElementById("selectedUserMetric").textContent = // Naam van geselecteerde gebruiker of "-" als er geen is
    state.selectedUser ? state.selectedUser.name : "-"; // Animaties voor metrische waarden
}