// Centrale state-object om gebruikersgegevens, laadstatus en foutmeldingen op te slaan
let state = {
  users: [], // API-data wordt hier opgeslagen
  loading: false, // Bepaalt of loading zichtbaar is.
  error: null, // Toont foutmelding
  selectedUser: null // Gebruiker geselecteerd in de UI. De app weet nu welke gebruiker actief is.
};

// UI is afgeleid van deze state, en wordt bijgewerkt wanneer de state verandert
// De UI verandert niet direct door events, maar door state-veranderingen

// App-state om gebruikersgegevens op te slaan
async function fetchUsers() {
  try {
    state.loading = true; // probeer de API te benaderen
    updateStatus();// status bijwerken

    // 2 seconden vertraging om loading te testen
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch("https://jsonplaceholder.typicode.com/users"); // fetch() HTTP request naar externe server

    if(!response.ok) {
      throw new Error("Netwerkfout" + response.status); // foutafhandeling+ statuscode
    }
    const data = await response.json(); // JSON-gegevens verwerken
    state.users = data; // gebruikersgegevens opslaan in de app-state
    state.error = null;

    // status bijwerken vervangt de fouten op het scherm
  } catch (error) {
    state.error = error.message; // foutmelding opslaan in de app-state
  } finally {
    state.loading = false; // laadstatus bijwerken
    updateStatus(); // status bijwerken
    renderUsers(state.users); // gebruikers weergeven in de DOM 
    renderUserDetail();
  }
 // details van de geselecteerde gebruiker weergeven 
} //De data wordt niet direct in de DOM gezet, maar eerst in de state opgeslagen

// Functie om gebruikers weer te geven in de DOM. renderUsers = UI afgeleide van state sprint 1
// Renderen betekent dat de DOM opnieuw wordt opgebouwd op basis van de huidige state.
 function renderUsers(userList) {
  const container = document.getElementById("users");
  container.innerHTML = "";

  userList.forEach(user => {
    const div = document.createElement("div");
    div.textContent = user.name;

// selectie toevoegen sprint 2
    div.addEventListener("click", () => {
      state.selectedUser = user; // geselecteerde gebruiker opslaan in de app-state
      renderUserDetail(); // details van de geselecteerde gebruiker weergeven
    });

    container.appendChild(div);
  });
} // De DOM is reflectie van de huidige applicatie-sate 

// Functie om details van de geselecteerde gebruiker weer te geven in de DOM.
function renderUserDetail() {
  const detailContainer = document.getElementById("user-detail");

  if (!state.selectedUser) {
    detailContainer.innerHTML = "<p>Selecteer een gebruiker om details te zien.</p>";
    return;
  }
  const user = state.selectedUser;
  detailContainer.innerHTML = `
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Company: ${user.company.name}</p>
  `;
}
// Functie om status weer te geven in de DOM. updateStatus = UI afgeleide van state
function updateStatus() {
  const statusDiv = document.getElementById("status");// statusdiv selecteren

  if (state.loading) {
    statusDiv.textContent = "Loading.."; // laadstatus weergeven
  
  } else if (state.error) {
    statusDiv.textContent = "Error: " + state.error; // foutmelding weergeven
  } else {
    statusDiv.textContent = ""; // lege status bij succesvolle laadactie
  }
}


// Event listener voor zoekinput. UI verandert niet direct door events, maar door state-veranderingen
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm)
  );
  renderUsers(filteredUsers);

  
});

fetchUsers();




