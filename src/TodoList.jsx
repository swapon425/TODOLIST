import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  
  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  
  const markAsDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  
  const markAllDone = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, isDone: true })));
  };

  
  const startEdit = (id, currentTask) => {
    setEditingId(id);
    setEditedTask(currentTask);
  };

  const saveEdit = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, task: editedTask } : todo
      )
    );
    setEditingId(null);
    setEditedTask("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTask("");
  };

  const deleteAll = () => setTodos([]);

  return (
    <div className="todo-container">
      <h2>Todo App 📝</h2>

      <div className="todo-input">
        <input
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addNewTask}>Add Task</button>
      </div>

      <h3>Tasks Todo</h3>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button className="save" onClick={() => saveEdit(todo.id)}>
                  Save
                </button>
                <button className="cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="task-view">
                <span
                  className={todo.isDone ? "done" : ""}
                >
                     <span className="circle"></span>
                  {todo.task}
                </span>
                <div className="task-buttons">
                  <button onClick={() => markAsDone(todo.id)}>Done</button>
                  <button onClick={() => startEdit(todo.id, todo.task)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="footer-buttons">
          <button onClick={markAllDone}>Mark All As Done</button>
          <button className="delete-all" onClick={deleteAll}>
            Delete All
          </button>
        </div>
      )}
    </div>
  );
}
