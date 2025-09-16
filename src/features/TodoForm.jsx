import { useState, useRef } from 'react';
import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';

const StyledForm = styled.form`
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding: 0.5em 0;
`;

const StyledButton = styled.button`
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  font-style: ${(props) => (props.disabled ? 'italic' : 'normal')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

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
    <StyledForm onSubmit={handleSubmit}>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        elementId={workingTodoTitle}
        labelText="Todo"
      />
      <StyledButton disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
