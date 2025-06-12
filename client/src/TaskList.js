import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => onEdit(task)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
