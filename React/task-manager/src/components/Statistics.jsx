import React from 'react';
import '../styles/Statistics.css';

function Statistics(props) {
  // props: totalTasks, completedTasks, completionRate, totalPomodoros, isDarkMode
  
  // bepaalt class voor card afhankelijk van dark mode
  let cardClass = 'card';
  if (props.isDarkMode) {
    cardClass = 'card dark';
  }
  
  return (
    <div className={cardClass}>
      <h2 className="card-title">📊 Statistieken</h2>
      
      <div className="stats-grid">
        
        <div className="stat-card stat-blue">
          <div className="stat-emoji">📋</div>
          <div className="stat-value">{props.totalTasks}</div> 
          <div className="stat-label">Totaal taken</div>
        </div>
        
        <div className="stat-card stat-green">
          <div className="stat-emoji">✅</div>
          <div className="stat-value">{props.completedTasks}</div>
          <div className="stat-label">Voltooid</div>
        </div>
        
        <div className="stat-card stat-purple">
          <div className="stat-emoji">📊</div>
          <div className="stat-value">{props.completionRate}%</div>
          <div className="stat-label">Voltooiingspercentage</div>
        </div>
        
        <div className="stat-card stat-red">
          <div className="stat-emoji">🍅</div>
          <div className="stat-value">{props.totalPomodoros}</div>
          <div className="stat-label">Pomodoros voltooid</div>
        </div>
        
      </div>
    </div>
  );
}

export default Statistics;