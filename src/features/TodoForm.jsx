import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ addTodo }) {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        elementId={workingTodoTitle}
        labelText="Todo"
      />

      <button type="submit" disabled={!workingTodoTitle}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
