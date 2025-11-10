import express from 'express';
import task from '../models/task.js';

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