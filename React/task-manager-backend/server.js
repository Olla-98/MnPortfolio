// de server.js is Backend voor Task Manager applicatie met Express en MongoDB
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Koppelen de database aan de backend met mongoose
const app = express(); // Initialiseer Express-applicatie
app.use(cors()); // CORS-middleware inschakelen om cross-origin verzoeken toe te staan
app.use(express.json()); // Middleware om JSON-verzoeken te parseren

// MongoDB verbinding maken, database naam is taskmanager. Als de database niet bestaat, wordt deze automatisch aangemaakt.
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager", {
  useNewUrlParser: true, // Gebruik de nieuwe URL/parser van MongoDB
  useUnifiedTopology: true, // Gebruik de nieuwe server discovery en monitoring engine
})

// Loggen van verbindingsstatus
.then(() => console.log("✅ MongoDB connected")) // Verbinding succesvol
.catch(err => console.error("❌ MongoDB connection error:", err));  // Fout bij verbinding



// Mongoose schema en model voor taken
const taskSchema = new mongoose.Schema({ // Definieer schema voor taken
  text: String,
  category: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema); // Maak Mongoose-model voor taken




// API-Routes voor CRUD-operaties op taken, inclusief ophalen, toevoegen, bijwerken en verwijderen van taken
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find(); // Haal alle taken op uit de database
  res.json(tasks); // Stuur de taken terug als JSON-respons
});

app.post("/api/tasks", async (req, res) => { // Voeg een nieuwe taak toe aan de database
  const task = new Task(req.body); // Maak een nieuwe taak met de gegevens uit het verzoek
  const savedTask = await task.save(); // Sla de taak op in de database
  res.json(savedTask); // Stuur de opgeslagen taak terug als JSON-respons
});

app.put("/api/tasks/:id", async (req, res) => { // Werk een bestaande taak bij op basis van de ID
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Werk de taak bij en retourneer de bijgewerkte taak
  res.json(updated); // Stuur de bijgewerkte taak terug als JSON-respons
});

app.delete("/api/tasks/:id", async (req, res) => { // Verwijder een taak op basis van de ID
  await Task.findByIdAndDelete(req.params.id);  // Verwijder de taak uit de database
  res.json({ success: true });  // Stuur een succesbericht terug als JSON-respons
});

app.listen(5000, () => console.log("Server running on port 5000")); // Start de server op poort 5000
