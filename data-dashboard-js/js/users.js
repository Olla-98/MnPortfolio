import { state } from "./state.js";
import { renderApp } from "./app.js";

export function getFilteredUsers() { // Gebruikers filteren op basis van zoekterm in de UI
  const searchTerm = document.getElementById("search").value.toLowerCase();
  return state.users.filter(u => u.name.toLowerCase().includes(searchTerm));
}

export function renderUsers(users) { // Gebruikers weergeven in de DOM
  const container = document.getElementById("users");
  container.innerHTML = "";
  users.forEach(user => {
    const div = document.createElement("div"); // DOM-element voor elke gebruiker
    div.className = "user-item";
    div.textContent = user.name;
    if (state.selectedUser?.id === user.id) div.classList.add("active");
    div.addEventListener("click", () => {
      state.selectedUser = user;
      renderApp();
    });
    container.appendChild(div);
  });
}

export function renderUserDetail() { // Details van geselecteerde gebruiker weergeven in de DOM
  const detail = document.getElementById("user-detail");
  if (!state.selectedUser) {
    detail.innerHTML = "<p>Select a user</p>";
    return;
  }

  detail.innerHTML = `
    <h3>${state.selectedUser.name}</h3>
    <p><strong>Email:</strong> ${state.selectedUser.email}</p>
    <p><strong>City:</strong> ${state.selectedUser.city}</p>
    <p><strong>Company:</strong> ${state.selectedUser.company}</p>
  `;
}