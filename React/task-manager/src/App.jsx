import React, {useState, useEffect, use} from "react";
import './styles/App.css';
import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import Statistics from './components/Statistics';

function App() {

    // State voor de lijst van taken, array van task objecten
    const [tasks, setTasks] = useState([]);

    // State voor de filteropties (alle, voltooid, niet voltooid) en categorieën    
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // State voor de pomodoro-timer en statistieken 
    const [totalPomodoros, setTotalPomodoros] = useState(0);

    // State voor dark mode, light mode. 
    const [isDarkMode, setIsDarkMode] = useState(false);


    // Laad taken uit localStorage bij initiële render, indien beschikbaar
    useEffect(() => {
        // laad taken uit local storage
        const savedTasks = localStorage.getItem('tasks');//getItem haalt data op uit local storage
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));//parse zet de data terug om in een bruikbaar formaat
        }

        // Laad totaal aantal pomodoros uit localStorage bij initiële render, indien beschikbaar
       const savedPromodoros = localStorage.getItem('totalPomodoros');//getItem haalt data op uit local storage
        if (savedPromodoros) {
            setTotalPomodoros(Number(savedPromodoros));//parse zet de data terug om in een bruikbaar formaat
        }

        // Laad dark mode voorkeur uit localStorage bij initiële render, indien beschikbaar
        const savedDarkMode = localStorage.getItem('isDarkMode');
        if (savedDarkMode == 'true') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }
, []);

// Opslaan van taken in localStorage bij elke wijziging van de takenlijst
useEffect(() => {
    if (tasks.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(tasks));//setItem slaat data op in local storage,stringify: data om in een string formaat.
    }
}, [tasks]);

// Opslaan van totaal aantal pomodoros in localStorage bij elke wijziging
useEffect(() => {
localStorage.setItem('totalPomodoros', totalPomodoros.toString());
}, [totalPomodoros]);

// Opslaan van dark mode voorkeur in localStorage bij elke wijziging 
useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
}, [isDarkMode]);


// Functie om een nieuwe taak toe te voegen
function addTask(taskText, category) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      category: category,
      createdAt: new Date().toISOString()
    };
    
    // voeg nieuwe task toe aan tasks array
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  }


  // functie om task completed status te veranderen
  function toggleTask(taskId) {
    const updatedTasks = [];
    
    // loop door alle tasks
    for (let i = 0; i < tasks.length; i++) {
      // als dit de task is die we zoeken
      if (tasks[i].id === taskId) {
        // maak een nieuwe task met omgedraaide completed status
        const updatedTask = {
          id: tasks[i].id,
          text: tasks[i].text,
          completed: !tasks[i].completed,
          category: tasks[i].category,
          createdAt: tasks[i].createdAt
        };
        updatedTasks.push(updatedTask);
      } else {
        // anders voeg gewoon de originele task toe
        updatedTasks.push(tasks[i]);
      }
    }
    setTasks(updatedTasks);
    }

    // functie om task te verwijderen
   function deleteTask(taskId) {
  setTasks(tasks.filter(task => task.id !== taskId));
}

    // functie om totaal aantal pomodoros te verhogen
    function incrementPomodoros() {
    setTotalPomodoros(totalPomodoros + 1);
  }

  // filter de tasks op basis van filter keuze
  let filteredTasks = [];
  
  // eerst filteren op status (all/active/completed)
  if (filter === 'all') {
    filteredTasks = tasks;
  } else if (filter === 'active') {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === false) {
        filteredTasks.push(tasks[i]);
      }
    }
  } else if (filter === 'completed') { // completed filter  
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === true) {
        filteredTasks.push(tasks[i]); // voeg toe aan gefilterde taken
      }
    }
  }

  // dan filteren op categorie
  if (categoryFilter !== 'all') {
    const categoryFilteredTasks = []; // tijdelijke array voor categorie gefilterde taken
    for (let i = 0; i < filteredTasks.length; i++) {
      if (filteredTasks[i].category === categoryFilter) { // als categorie overeenkomt 
        categoryFilteredTasks.push(filteredTasks[i]); // voeg toe aan categorie gefilterde taken
      }
    }
    filteredTasks = categoryFilteredTasks;
  }
  
  // bereken statistieken
  const totalTasks = tasks.length; // totaal aantal taken
  
  let completedTasks = 0; // aantal voltooide taken 
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      completedTasks = completedTasks + 1; // tel voltooide taken
    }
  }
  
  let activeTasks = 0; /// aantal actieve taken 
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === false) { // als taak niet voltooid is
      activeTasks = activeTasks + 1; // tel actieve taken
    }
  }

  // bereken percentage
  let completionRate = 0;
  if (totalTasks > 0) {
    completionRate = Math.round((completedTasks / totalTasks) * 100); // afgerond percentage    
  }

  // bepaal welke class voor dark mode
  let containerClass = 'app-container';// standaard light mode class
  if (isDarkMode) {
    containerClass = 'app-container dark-mode';// dark mode class
  }

  return (
    <div className={containerClass}>
      <div className="app-content">
        
        <div className="app-header">
          <h1 className="app-title">📋 Task Manager + Pomodoro</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="dark-mode-toggle"
          >
            {isDarkMode ? '☀' : '🌙'}
          </button>
        </div>

        <div className="app-grid">
          
          <div className="left-column">
            <TaskInput 
              onAddTask={addTask}
              isDarkMode={isDarkMode}
            />

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

