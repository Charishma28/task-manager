import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // list of tasks
  const [newTask, setNewTask] = useState(''); // new task input

  // get tasks from the server
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  // run only one time when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // when user clicks ✅ or ❌
  const toggleComplete = (id, newStatus) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, completed: updatedTask.completed } : task
          )
        );
      })
      .catch((err) => console.error('Error updating task status:', err));
  };

  // when user clicks delete ❌
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => console.error('Error deleting task:', err));
  };
  
  // when user clicks Add Task button
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTask,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]); // add the new task to the list
        setNewTask(''); // clear the input
      })
      .catch((err) => console.error("Error adding task:", err));
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
                <button className="delete" onClick={() => handleDelete(task.id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default App;
