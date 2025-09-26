import React, { useState, useEffect } from "react";
import "./TodoItem.css";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  useEffect(() => setDraft(todo.text), [todo.text]);

  function saveEdit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setEditing(false);
  }

  return (
    <li className="todo-item">
      {/* Left side */}
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
          aria-label={`Toggle ${todo.text}`}
        />

        {editing ? (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setDraft(todo.text);
                setEditing(false);
              }
            }}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span
            className={`todo-text ${
              todo.completed ? "todo-completed" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Right side (actions) */}
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <button onClick={saveEdit} className="todo-btn btn-save">
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setDraft(todo.text);
              }}
              className="todo-btn btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="todo-btn btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="todo-btn btn-delete"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
