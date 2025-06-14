// taskManager.js
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "tasks.json");

class TaskManager {
  constructor() {
    this.tasks = [];

    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        this.tasks = JSON.parse(data || "[]");
      }
    } catch (err) {
      console.error("❌ Error reading tasks.json:", err);
    }
  }

  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  saveTasks() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.tasks, null, 2));
      return true;
    } catch (err) {
      console.error("❌ Error writing to tasks.json:", err);
      return false;
    }
  }

  getAllTasks() {
    return this.tasks;
  }

  addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return this.saveTasks() ? newTask : null;
  }

  updateTask(id, { title, completed }) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;

    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;

    return this.saveTasks() ? task : false;
  }

  deleteTask(id) {
    const originalLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length === originalLength) return null;
    return this.saveTasks() ? true : false;
  }
}

module.exports = TaskManager;
