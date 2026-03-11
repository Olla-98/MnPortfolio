import { fetchUsers } from "./api.js";
import { state } from "./state.js";
import { renderMetrics } from "./metrics.js";
import { renderChart } from "./chart.js";
import { renderUsers, renderUserDetail, getFilteredUsers } from "./users.js";

document.addEventListener("DOMContentLoaded", () => { // Wacht tot DOM klaar is

  // Centrale functie om pagina te tonen
  function showPage(pageId) {
    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item");

    // Alle pagina's verbergen
    pages.forEach(p => p.style.display = "none");

    // Toon de gevraagde pagina
    const target = document.getElementById(pageId);
    if (target) target.style.display = "block";

    // Active class beheren
    navItems.forEach(n => n.classList.remove("active"));
    const activeBtn = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  // Navigatie click listeners
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });

  // Default pagina
  showPage("dashboardPage");

  // Search functionaliteit
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderUsers(getFilteredUsers());
    });
  }

  // Theme toggle
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // Chart buttons
  const barBtn = document.getElementById("barChart");
  const doughnutBtn = document.getElementById("doughnutChart");

  if (barBtn) barBtn.addEventListener("click", () => renderChart("bar"));
  if (doughnutBtn) doughnutBtn.addEventListener("click", () => renderChart("doughnut"));

  // Centrale renderfunctie
  function renderApp() {
    renderMetrics();
    renderUsers(getFilteredUsers());
    renderUserDetail();
    renderChart(); // standaard chart tonen
  }

  // Maak renderApp beschikbaar voor andere modules
  window.renderApp = renderApp;

  // Fetch data en start app
  fetchUsers().then(() => {
    renderApp(); // render de app nadat data geladen is
  }).catch(err => console.error("Error fetching users:", err));
});