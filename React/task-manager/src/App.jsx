import React, { useState, useEffect } from "react";
import "./styles/App.css";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import PomodoroTimer from "./components/PomodoroTimer";
import Statistics from "./components/Statistics";
import * as api from "./api"; // api.js importeren

// Hoofd App component, beheert state en logica
function App() {
  const [tasks, setTasks] = useState([]); // Takenlijst state
  const [filter, setFilter] = useState("all"); // Filter state
  const [categoryFilter, setCategoryFilter] = useState("all"); // Categorie filter state
  const [totalPomodoros, setTotalPomodoros] = useState(0);  // Totaal voltooide pomodoros
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Taken ophalen uit backend
  useEffect(() => {
    async function loadTasks() { // Taken laden
      try {
        const data = await api.getTasks(); // API aanroepen om taken op te halen
        setTasks(data); // Taken in state zetten
      } catch (err) {  
        console.error("Fout bij het laden van taken:", err);
      }
    }
    loadTasks(); // Taken laden bij component mount

    const savedDarkMode = localStorage.getItem("isDarkMode"); // Dark mode voorkeur laden
    setIsDarkMode(savedDarkMode === "true"); // Instellen van dark mode op basis van opgeslagen voorkeur
  }, []);

  // Dark mode opslaan in localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);  // Dark mode voorkeur opslaan bij wijziging
  

  // CRUD-functies via API
  async function addTask(taskText, category) { // Taak toevoegen
    if (!taskText.trim()) return;  // Lege taken niet toevoegen
    try {
      const newTask = { text: taskText, category, completed: false }; // Nieuwe taak maken
      const savedTask = await api.addTask(newTask); // Taak toevoegen via API
      setTasks(prevTasks => [...prevTasks, savedTask]); // Taak aan state toevoegen
    } catch (err) {
      console.error("Fout bij toevoegen taak:", err);
    }
  }

  async function toggleTask(taskId) { // Taak voltooien/ongedaan maken
    try {
      const task = tasks.find(t => t._id === taskId); // Huidige taak vinden
      const updated = await api.updateTask(taskId, { completed: !task.completed }); // Taak bijwerken via API
      setTasks(prevTasks => prevTasks.map(t => (t._id === taskId ? updated : t))); // State bijwerken
    } catch (err) {
      console.error("Fout bij updaten taak:", err);
    }
  }

  async function deleteTask(taskId) { // Taak verwijderen
    try {
      await api.deleteTask(taskId); // Taak verwijderen via API
      setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId)); // State bijwerken
    } catch (err) {
      console.error("Fout bij verwijderen taak:", err);
    }
  }

  function incrementPomodoros() { // Pomodoro teller verhogen
    setTotalPomodoros(prev => prev + 1);
  }

  // Filteren en statistieken
  let filteredTasks = tasks; // Taken filteren op basis van status en categorie
  if (filter === "active") filteredTasks = tasks.filter(t => !t.completed); // Alleen actieve taken tonen 
  else if (filter === "completed") filteredTasks = tasks.filter(t => t.completed); // Alleen voltooide taken tonen

  if (categoryFilter !== "all") filteredTasks = filteredTasks.filter(t => t.category === categoryFilter); // Filteren op categorie

  const totalTasks = tasks.length; // Statistieken berekenen
  const completedTasks = tasks.filter(t => t.completed).length; // Aantal voltooide taken
  const activeTasks = tasks.filter(t => !t.completed).length; // Aantal actieve taken
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0; // Voltooiingspercentage


  const containerClass = isDarkMode ? "app-container dark-mode" : "app-container"; // CSS klasse voor dark mode

  // Render component met props en state doorgeven aan child componenten
  return (
    <div className={containerClass}>
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">📋 Task Manager + Pomodoro</h1>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="dark-mode-toggle">
            {isDarkMode ? "☀" : "🌙"}
          </button>
        </div>

        <div className="app-grid">
          <div className="left-column">
            <TaskInput onAddTask={addTask} isDarkMode={isDarkMode} />

            <FilterButtons
              filter={filter}
              setFilter={setFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              totalTasks={totalTasks}
              activeTasks={activeTasks}
              completedTasks={completedTasks}
              isDarkMode={isDarkMode}
            />

            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="right-column">
            <PomodoroTimer
              onPomodoroComplete={incrementPomodoros}
              isDarkMode={isDarkMode}
            />

            <Statistics
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              completionRate={completionRate}
              totalPomodoros={totalPomodoros}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
