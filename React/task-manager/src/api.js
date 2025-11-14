const API_URL = "http://localhost:5000/api/tasks"; // api basis URL

export async function getTasks() { // Haal alle taken op
  const res = await fetch(API_URL); // GET verzoek naar de API
  return res.json(); // Retourneer de JSON data
}

export async function addTask(task) { // Voeg een nieuwe taak toe
  const res = await fetch(API_URL, { // POST verzoek naar de API
    method: "POST", // Gebruik de POST methode
    headers: { "Content-Type": "application/json" }, // Zet de juiste headers
    body: JSON.stringify(task), // Zet de taakdata om naar JSON
  });
  return res.json(); // Retourneer de toegevoegde taak als JSON
}

export async function updateTask(id, updates) { // Werk een bestaande taak bij
  const res = await fetch(`${API_URL}/${id}`, { // PUT verzoek naar de API
    method: "PUT", // Gebruik de PUT methode
    headers: { "Content-Type": "application/json" }, // Zet de juiste headers
    body: JSON.stringify(updates),  // Zet de update data om naar JSON
  });
  return res.json(); // Retourneer de bijgewerkte taak als JSON
}

export async function deleteTask(id) {  // Verwijder een taak
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });  // DELETE verzoek naar de API
}
