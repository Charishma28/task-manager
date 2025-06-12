import React, { useState, useEffect } from 'react';

function TaskForm({ onSave, editTask }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ ...editTask, title });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">{editTask ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default TaskForm;
