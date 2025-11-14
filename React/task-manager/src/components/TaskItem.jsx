import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import '../styles/TaskItem.css';

function TaskItem(props) {
  // props: task, onToggle, onDelete, isDarkMode
  
  // bepaalt class voor task item afhankelijk van voltooiing en dark mode
  let taskItemClass = 'task-item';
  if (props.task.completed) {
    taskItemClass = 'task-item completed';
  }
  if (props.isDarkMode) {
    taskItemClass = taskItemClass + ' dark';
  }
  
  // bepaalt class voor checkbox afhankelijk van voltooiing 
  let checkboxClass = 'task-checkbox';
  if (props.task.completed) {
    checkboxClass = 'task-checkbox checked';
  }
  
  // bepaalt class voor task text afhankelijk van voltooiing
  let taskTextClass = 'task-text';
  if (props.task.completed) {
    taskTextClass = 'task-text line-through';
  }
  
  return ( 
    <div className={taskItemClass}>
      <div className="task-item-content">
        
        <button 
          onClick={() => props.onToggle(props.task._id)} // Toggle voltooiing bij klikken, de task ID doorgeven
          className={checkboxClass} // Checkbox class instellen
        >
          {props.task.completed && <Check size={16} />} 
        </button>
        
        <div className="task-info">
          <p className={taskTextClass}>
            {props.task.text}   
          </p>
          <p className="task-category">
            {props.task.category}
          </p>
        </div>
        
        <button
          onClick={() => props.onDelete(props.task._id)}
          className="delete-button"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;