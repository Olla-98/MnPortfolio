import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList(props) {
  // props: tasks, onToggleTask, onDeleteTask, isDarkMode
  
  // bepaalt class voor card afhankelijk van dark mode
  let cardClass = 'card';
  if (props.isDarkMode) {
    cardClass = 'card dark';
  }
  
  // bepaalt class voor no tasks message afhankelijk van dark mode
  let noTasksClass = 'no-tasks-message';
  
  return (
    <div className={cardClass}>
      <h2 className="card-title">📝 Taken</h2>
      
      {props.tasks.length === 0 ? (
        <p className={noTasksClass}>
          Geen taken gevonden. Voeg er een toe! 🎯
        </p>
      ) : (
        <div className="task-list">
          {props.tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={props.onToggleTask}
                onDelete={props.onDeleteTask}
                isDarkMode={props.isDarkMode}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TaskList;