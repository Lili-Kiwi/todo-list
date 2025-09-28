import { useState, useRef } from 'react';
function TodoForm({ addTodo, isSaving }) {
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
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="workingTodoTitle"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
      />
      <button disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
