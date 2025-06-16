import React, { useEffect, useState } from 'react';
import './App.css';
import {
  fetchTasks as getTasks,
  addTask,
  updateTask,
  deleteTask,
} from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = () => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        setError("Couldn't fetch tasks.");
      });
  };

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setError('Title is required.');
      return;
    }

    addTask({ title: newTask, completed: false })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask('');
        setError('');
      })
      .catch((err) => {
        console.error('Error adding task:', err);
        const errMsg = err?.response?.data?.error || 'Failed to add task.';
        setError(errMsg);
      });
  };

  const toggleComplete = (id, newStatus) => {
    updateTask(id, { completed: newStatus })
      .then((res) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, completed: res.data.completed } : task
          )
        );
      })
      .catch((err) => {
        console.error('Error updating task status:', err);
        setError("Couldn't update task.");
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting task:', err);
        setError("Couldn't delete task.");
      });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Task Manager</h1>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          placeholder="Enter task title"
          onChange={(e) => {
            setNewTask(e.target.value);
            setError('');
          }}
        />
        <button onClick={handleAddTask}>➕ Add Task</button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.id}>
              <span className="task-title">{task.title}</span>
              <div className="task-buttons">
                <button
                  className={task.completed ? 'status' : 'not-done'}
                  onClick={() => toggleComplete(task.id, !task.completed)}
                >
                  {task.completed ? '✅ Done' : '❌ Not done'}
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
