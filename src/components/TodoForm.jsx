import React, { useState } from "react";
import "./TodoForm.css";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="todo-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New task"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}
