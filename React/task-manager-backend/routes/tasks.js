import express from 'express';
import task from '../models/Task.js';

const router = express.Router();

// Alle taken ophalen 
router.get("/", async (req, res) => { // Endpoint om alle taken op te halen
    try {
        const tasks = await task.find().sort({ createdAt: -1 });// Taken sorteren op aanmaakdatum (nieuwste eerst)
        res.json(tasks); // Taken als JSON terugsturen
    } catch (err) {
        res.status(500).json({error: err.message}); // Foutafhandeling
    }
});

// ➕ Nieuwe taak toevoegen
router.post("/", async (req, res) => {
  try {
    const { text, category } = req.body;
    const task = await Task.create({ text, category });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔁 Update taak (toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const task = await Task.findByIdAndUpdate(id, update, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Taak verwijderen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Taak verwijderd" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;