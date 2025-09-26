import React, { useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos_v1", []);
  const [filter, setFilter] = useState("all");

  function addTodo(todo) {
    setTodos((prev) => [todo, ...prev]);
  }
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }
  function editTodo(id, text) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    );
  }
  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do</h1>

      <TodoForm onAdd={addTodo} />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className={`todo-btn ${filter === "all" ? "todo-btn-active" : "todo-btn-inactive"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`todo-btn ${filter === "active" ? "todo-btn-active" : "todo-btn-inactive"}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`todo-btn ${filter === "completed" ? "todo-btn-active" : "todo-btn-inactive"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className="text-sm text-slate-500">
          {todos.filter((t) => !t.completed).length} active
        </div>
      </div>

      <div className="mt-4">
        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={clearCompleted} className="clear-btn">
          Clear completed
        </button>
        <div className="text-sm text-slate-500">{todos.length} total</div>
      </div>
    </div>
  );
}
