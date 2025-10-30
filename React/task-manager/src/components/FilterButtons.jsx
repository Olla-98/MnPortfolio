import React from 'react';
import '../styles/FilterButtons.css';

function FilterButtons(props) {
  // props: filter, setFilter, categoryFilter, setCategoryFilter, counts, isDarkMode
  
  // bepaal class voor card
  let cardClass = 'card';
  if (props.isDarkMode) {
    cardClass = 'card dark';
  }
  
  // bepaal classes voor filter buttons
  let allButtonClass = 'filter-button';
  if (props.filter === 'all') {
    allButtonClass = 'filter-button active';
  }
  
  let activeButtonClass = 'filter-button';
  if (props.filter === 'active') {
    activeButtonClass = 'filter-button active';
  }
  
  let completedButtonClass = 'filter-button';
  if (props.filter === 'completed') {
    completedButtonClass = 'filter-button active';
  }
  
  return (
    <div className={cardClass}>
      <div className="filter-container">
        
        <div className="status-filters">
          <button
            onClick={() => props.setFilter('all')}
            className={allButtonClass}
          >
            Alles ({props.totalTasks})
          </button>
          <button
            onClick={() => props.setFilter('active')}
            className={activeButtonClass}
          >
            Actief ({props.activeTasks})
          </button>
          <button
            onClick={() => props.setFilter('completed')}
            className={completedButtonClass}
          >
            Voltooid ({props.completedTasks})
          </button>
        </div>
        
        <select
          value={props.categoryFilter}
          onChange={(e) => props.setCategoryFilter(e.target.value)}
          className="category-select"
        >
          <option value="all">Alle categorieën</option>
          <option value="werk">Werk</option>
          <option value="studie">Studie</option>
          <option value="persoonlijk">Persoonlijk</option>
          <option value="sport">Sport</option>
        </select>
      </div>
    </div>
  );
}

export default FilterButtons;