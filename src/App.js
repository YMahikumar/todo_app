import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTodo, setEditTodo] = useState({ title: "", details: "", deadline: "" });

  const addTodo = () => {
    if (!title || !details || !deadline) return;
    setTodos([...todos, { id: uuidv4(), title, details, deadline, completed: false }]);
    setTitle("");
    setDetails("");
    setDeadline("");
  };

  const toggleStatus = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTodo({ title: todo.title, details: todo.details, deadline: todo.deadline });
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => (todo.id === editingId ? { ...todo, ...editTodo } : todo)));
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <h1>ToDo Application</h1>
      <div className="input-container">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button onClick={addTodo}>Add ToDo</button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingId === todo.id ? (
              <div>
                <input type="text" value={editTodo.title} onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })} />
                <input type="text" value={editTodo.details} onChange={(e) => setEditTodo({ ...editTodo, details: e.target.value })} />
                <input type="date" value={editTodo.deadline} onChange={(e) => setEditTodo({ ...editTodo, deadline: e.target.value })} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.details}</p>
                <p>Deadline: {todo.deadline}</p>
                <div className="buttons">
                  <button onClick={() => toggleStatus(todo.id)}>
                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button onClick={() => startEditing(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
