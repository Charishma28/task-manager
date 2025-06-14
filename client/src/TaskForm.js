import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate input
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add task");
        return;
      }

      setTitle("");     // Clear input
      setError("");     // Clear error
      onAdd(data);      // Call parent update
    } catch (err) {
      console.error("❌ Network error:", err);
      setError("Server error. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem" }}>Add Task</button>

      {/* ✅ Display error if exists */}
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
    </form>
  );
}

export default TaskForm;
