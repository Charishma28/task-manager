// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DATA_FILE = "./tasks.json";

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// ✅ Load existing tasks from file safely
try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    tasks = JSON.parse(data || "[]");
  } else {
    console.log("⚠️ tasks.json not found. Starting with empty task list.");
  }
} catch (err) {
  console.error("❌ Error reading tasks.json:", err);
  tasks = [];
}

// ✅ Save tasks to file safely
function saveTasks(res = null) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("❌ Error writing to tasks.json:", err);
    if (res) {
      return res.status(500).json({ error: "Failed to save tasks" });
    }
  }
}

// ✅ GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ POST /tasks with basic validation
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  const saveError = saveTasks(res);
  if (!saveError) {
    res.status(201).json(newTask);
  }
});

// ✅ PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, completed } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean" });
  }

  task.title = title ?? task.title;
  task.completed = completed ?? task.completed;

  const saveError = saveTasks(res);
  if (!saveError) {
    res.json(task);
  }
});

// ✅ DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Task not found" });
  }

  const saveError = saveTasks(res);
  if (!saveError) {
    res.status(204).end(); // No Content
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
