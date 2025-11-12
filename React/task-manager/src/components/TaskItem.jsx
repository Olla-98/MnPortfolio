import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import '../styles/TaskItem.css';

function TaskItem(props) {
  // props: task, onToggle, onDelete, isDarkMode
  
  // bepaal class voor task item
  let taskItemClass = 'task-item';
  if (props.task.completed) {
    taskItemClass = 'task-item completed';
  }
  if (props.isDarkMode) {
    taskItemClass = taskItemClass + ' dark';
  }
  
  // bepaal class voor checkbox
  let checkboxClass = 'task-checkbox';
  if (props.task.completed) {
    checkboxClass = 'task-checkbox checked';
  }
  
  // bepaal class voor task text
  let taskTextClass = 'task-text';
  if (props.task.completed) {
    taskTextClass = 'task-text line-through';
  }
  
  return (
    <div className={taskItemClass}>
      <div className="task-item-content">
        
        <button
          onClick={() => props.onToggle(props.task._id)}
          className={checkboxClass}
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