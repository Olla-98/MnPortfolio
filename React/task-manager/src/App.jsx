import React, { useState, useEffect } from "react";
import "./styles/App.css";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import PomodoroTimer from "./components/PomodoroTimer";
import Statistics from "./components/Statistics";
import * as api from "./api"; // jouw api.js

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [totalPomodoros, setTotalPomodoros] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Taken ophalen uit backend
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await api.getTasks(); // aangepast
        setTasks(data);
      } catch (err) {
        console.error("Fout bij het laden van taken:", err);
      }
    }
    loadTasks();

    const savedDarkMode = localStorage.getItem("isDarkMode");
    setIsDarkMode(savedDarkMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  // CRUD-functies via API
  async function addTask(taskText, category) {
    if (!taskText.trim()) return;
    try {
      const newTask = { text: taskText, category, completed: false };
      const savedTask = await api.addTask(newTask); // aangepast
      setTasks(prevTasks => [...prevTasks, savedTask]);
    } catch (err) {
      console.error("Fout bij toevoegen taak:", err);
    }
  }

  async function toggleTask(taskId) {
    try {
      const task = tasks.find(t => t._id === taskId);
      const updated = await api.updateTask(taskId, { completed: !task.completed });
      setTasks(prevTasks => prevTasks.map(t => (t._id === taskId ? updated : t)));
    } catch (err) {
      console.error("Fout bij updaten taak:", err);
    }
  }

  async function deleteTask(taskId) {
    try {
      await api.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Fout bij verwijderen taak:", err);
    }
  }

  function incrementPomodoros() {
    setTotalPomodoros(prev => prev + 1);
  }

  // Filteren en statistieken
  let filteredTasks = tasks;
  if (filter === "active") filteredTasks = tasks.filter(t => !t.completed);
  else if (filter === "completed") filteredTasks = tasks.filter(t => t.completed);

  if (categoryFilter !== "all") filteredTasks = filteredTasks.filter(t => t.category === categoryFilter);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const containerClass = isDarkMode ? "app-container dark-mode" : "app-container";

  // Render
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
