import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import '../styles/TaskInput.css';

function TaskInput(props) {
  // props van parent: onAddTask, isDarkMode
  
  // state voor input veld
  const [taskInput, setTaskInput] = useState('');
  
  // state voor geselecteerde categorie
  const [selectedCategory, setSelectedCategory] = useState('werk');
  
  // lijst van categorieën
  const categories = ['werk', 'studie', 'persoonlijk', 'sport'];
  
  // functie om task toe te voegen
  function handleAddTask() {
    // check of er tekst is ingevuld
    if (taskInput.trim() === '') {
      return;
    }
    
    // roepen de functie aan die we van App.jsx kregen
    props.onAddTask(taskInput, selectedCategory);
    
    // maak input veld leeg
    setTaskInput('');
  }
  
  // functie voor enter toets, zodat ook met enter kan toevoegen
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }
  
  // bepaalt class voor card
  let cardClass = 'card';
  if (props.isDarkMode) {
    cardClass = 'card dark';
  }
  
  return (
    <div className={cardClass}>
      <h2 className="card-title">➕ Nieuwe Taak</h2>
      
      <div className="task-input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Wat moet je doen?"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          <Plus size={20} /> Toevoegen
        </button>
      </div>
      
      <div className="category-buttons">
        {categories.map((cat) => {
          // bepaal class voor elke button
          let buttonClass = 'category-button';
          if (selectedCategory === cat) {
            buttonClass = 'category-button active';
          }
          
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={buttonClass}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TaskInput;