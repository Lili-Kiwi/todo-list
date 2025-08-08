import { useState, useRef } from 'react';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  console.log("input => ", input);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e.target.todoTitle => ", e.target.todoTitle);
    console.log("e.target.todoTitle.value => ", e.target.todoTitle.value);
    const todoTitle = e.target.todoTitle.value;
    console.log("todoTitle => ", todoTitle);
    addTodo(todoTitle);
    // e.target.reset();
    setInput('');
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
