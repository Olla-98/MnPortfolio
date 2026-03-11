import { state } from "./state.js";

let chart;

export function renderChart(type = "bar") {
  const canvas = document.getElementById("usersChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d"); // Chart.js context
  const citiesCount = {}; // Aantal gebruikers per stad tellen
  state.users.forEach(u => {
    const city = u.city;
    citiesCount[city] = (citiesCount[city] || 0) + 1;
  });

  if (chart) chart.destroy();

  chart = new Chart(ctx, { // Chart.js configuratie
    type,
    data: {
      labels: Object.keys(citiesCount), // Steden als labels
      datasets: [{
        label: "Users per city",
        data: Object.values(citiesCount),
        backgroundColor: Object.keys(citiesCount).map((_, i) => `hsl(${i * 40}, 70%, 60%)`) // Dynamische kleuren voor elke stad
      }]
    },
    options: { responsive: true, maintainAspectRatio: false } // Responsieve chart
  });
}