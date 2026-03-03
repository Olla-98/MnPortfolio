// (Centrale state-object) om gebruikersgegevens, laadstatus en foutmeldingen op te slaan
let state = {
  users: [], // API-data wordt hier opgeslagen
  loading: false, // Bepaalt of loading zichtbaar is.
  error: null, // Toont foutmelding
  selectedUser: null // Gebruiker geselecteerd in de UI. De app weet nu welke gebruiker actief is.
};

// render entry point: UI bijwerken op basis van de huidige state
function renderApp() {
  updateStatus();

  const filteredUsers = getFilteredUsers(); // gefilterde gebruikers ophalen

  // Reset selectie als user niet meer zichtbaar is
  if (
    state.selectedUser && 
    !filteredUsers.some(user => user.id === state.selectedUser.id)
  ) {
    state.selectedUser = null; // Reset de selectie
  }

  renderUsers(filteredUsers); // gebruikers weergeven in de DOM
  renderUserDetail(); // details van de geselecteerde gebruiker weergeven
  renderMetrics(); // metrische gegevens weergeven in de DOM  

  // alleen chart renderen als users geladen zijn
  if (state.users.length > 0) {
    renderChart(currentChartType); // Chart.js grafiek weergeven
  }
}
// UI is afgeleid van deze state, en wordt bijgewerkt wanneer de state verandert
// De UI verandert niet direct door events, maar door state-veranderingen


// App-state om gebruikersgegevens op te slaan
async function fetchUsers() {
  try {
    state.loading = true; // probeer de API te benaderen
    renderApp(); // status bijwerken

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok) {
      throw new Error("Netwerkfout" + response.status);
    }

    const data = await response.json();
    state.users = data;
    state.error = null;

  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
    renderApp();
  }
} 
//De data wordt niet direct in de DOM gezet, maar eerst in de state opgeslagen


// Afgeleide UI via getFilteredUsers()
function getFilteredUsers() {
  const searchInput = document.getElementById("search");
  const searchTerm = searchInput.value.toLowerCase();

  return state.users.filter(user =>
     user.name.toLowerCase().includes(searchTerm)
  );
}


// Functie om gebruikers weer te geven in de DOM.
function renderUsers(userList) {
  const container = document.getElementById("users");
  container.innerHTML = "";

  userList.forEach(user => {
    const div = document.createElement("div");
    div.classList.add("user-item");
    div.textContent = user.name;

    // Highlighten van de geselecteerde gebruiker
    if (state.selectedUser && state.selectedUser.id === user.id) {
      div.classList.add("active");
    }

    // selectie toevoegen sprint 2
    div.addEventListener("click", () => {
      state.selectedUser = user;
      renderApp();
    });

    container.appendChild(div);
  });
} 
// De DOM is reflectie van de huidige applicatie-sate 


// Functie om details van de geselecteerde gebruiker weer te geven in de DOM.
function renderUserDetail() {
  const detail = document.getElementById("user-detail");

  if (!state.selectedUser) {
    detail.innerHTML = "<p>Selecteer een gebruiker</p>";
    return;
  }

  detail.classList.remove("fade-in");

  setTimeout(() => {
    detail.innerHTML = `
      <h3>${state.selectedUser.name}</h3>
      <p><strong>Email:</strong> ${state.selectedUser.email}</p>
      <p><strong>City:</strong> ${state.selectedUser.address.city}</p>
      <p><strong>Company:</strong> ${state.selectedUser.company.name}</p>
    `;

    detail.classList.add("fade-in");
  }, 50);
}


// Functie om status weer te geven in de DOM.
function updateStatus() {
  const statusDiv = document.getElementById("status");

  if (state.loading) {
    statusDiv.textContent = "Loading..";
  } else if (state.error) {
    statusDiv.textContent = "Error: " + state.error;
  } else {
    statusDiv.textContent = "";
  }
}


// Event listener voor zoekinput
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  renderApp();
});


// Functie om thema te toggelen
function toggleTheme() {
  document.body.classList.toggle("dark");
}


// Functie om metrische gegevens weer te geven in de DOM. renderMetrics = UI afgeleide van state sprint 3
function renderMetrics() {
  const cities = new Set(
    state.users.map(user => user.address.city)
  );

  document.getElementById("selectedUserMetric").textContent =
    state.selectedUser ? state.selectedUser.name : "-";

  animateValue("totalUsers", state.users.length);
  animateValue("uniqueCities", cities.size);
}


// Chart.js integratie
let chart;
let currentChartType = "bar";

function renderChart(type = "bar") {

  currentChartType = type;

  const canvas = document.getElementById("usersChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const citiesCount = {};

  state.users.forEach(user => {
    const city = user.address.city;
    citiesCount[city] = (citiesCount[city] || 0) + 1;
  });

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: type,
    data: {
      labels: Object.keys(citiesCount),
      datasets: [{
        label: "Users per city",
        data: Object.values(citiesCount),
        backgroundColor: [
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#3b82f6",
          "#14b8a6",
          "#e11d48",
          "#a855f7",
          "#f97316"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000
      },
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

function animateValue(id, end) {
  const el = document.getElementById(id);
  let start = 0;
  const duration = 600;
  const stepTime = 10;
  const increment = end / (duration / stepTime);

  const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      el.textContent = end;
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(start);
    }
  }, stepTime);
}


fetchUsers();
