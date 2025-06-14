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

  // Fetch all tasks when the app loads
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = () => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    addTask({ title: newTask, completed: false })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask('');
      })
      .catch((err) => console.error('Error adding task:', err));
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
      .catch((err) => console.error('Error updating task status:', err));
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Task Manager</h1>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          placeholder="Enter task title"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>➕ Add Task</button>
      </div>

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
