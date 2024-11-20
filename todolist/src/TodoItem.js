import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // Track if editing is active
  const [newText, setNewText] = useState(todo.text); // Track new text during edit

  // Handle edit submit (Save)
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (newText.trim()) {
      editTodo(todo.id, newText);
      setIsEditing(false); // Exit edit mode
    }
  };

  // Handle clicking on todo text to start editing
  const handleClickEdit = () => {
    setIsEditing(true);
  };

  // If editing, show input field; otherwise, show text
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={() => setIsEditing(false)} // Lose focus, exit edit mode
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
          onClick={handleClickEdit} // Enable editing when clicked
        >
          {todo.text}
        </span>
      )}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
