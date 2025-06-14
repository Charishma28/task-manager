// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const TaskManager = require("./taskManager");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const taskManager = TaskManager.getInstance();

// ✅ GET /tasks
app.get("/tasks", (req, res) => {
  res.json(taskManager.getAllTasks());
});

// ✅ POST /tasks with basic validation
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  }

  const newTask = taskManager.addTask(title.trim());
  if (!newTask) return res.status(500).json({ error: "Failed to save task." });
  res.status(201).json(newTask);
});

// ✅ PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean." });
  }

  const updatedTask = taskManager.updateTask(taskId, { title, completed });
  if (updatedTask === null) return res.status(404).json({ error: "Task not found." });
  if (updatedTask === false) return res.status(500).json({ error: "Failed to update task." });

  res.json(updatedTask);
});

// ✅ DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const deleted = taskManager.deleteTask(taskId);

  if (deleted === null) return res.status(404).json({ error: "Task not found." });
  if (deleted === false) return res.status(500).json({ error: "Failed to delete task." });

  res.status(204).end();
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
