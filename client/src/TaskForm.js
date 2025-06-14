import React, { useState, useEffect } from 'react';

function TaskForm({ onSave, editTask }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    } else {
      setTitle('');
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSave({ ...editTask, title: title.trim() }); // onSave may call API in parent
      setTitle('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while saving the task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? (editTask ? 'Updating...' : 'Adding...') : (editTask ? 'Update' : 'Add')}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TaskForm;
