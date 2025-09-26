import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) {
    return (
      <p className="todo-placeholder">
        No tasks yet — add one!
      </p>
    );
  }

  // Sort by createdAt (newest first)
  const sorted = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <ul className="todo-list">
      {sorted.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
