//server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./tasks.json";

// Load existing tasks 
let tasks = [];
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE);
  tasks = JSON.parse(data);
}

// Save tasks to the file
function saveTasks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST tasks
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

// PUT 
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;
  saveTasks();
  res.json(task);
});

// DELETE 
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
  res.status(204).end();
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
