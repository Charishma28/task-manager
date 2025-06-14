import React, { useState } from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await onDelete(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleToggle = async (id) => {
    try {
      await onToggle(id);
    } catch (err) {
      console.error(err);
      setError("Failed to update task status.");
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => onEdit(task)}>✏️</button>
            <button onClick={() => handleDelete(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
