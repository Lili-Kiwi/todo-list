import React from 'react';
import TodoForm from './features/TodoForm';
import ToDoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';

const TodosPage = ({
  addTodo,
  isSaving,
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
  isLoading,
  showMessage,
  errorMessage,
  onClearError,
}) => {
  return (
    <div>
      <TodoForm addTodo={addTodo} isSaving={isSaving} />
      <ToDoList
        todoList={todoList}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {isLoading && <p>Loading...</p>}
      {showMessage}
      {errorMessage && (
        <>
          <hr />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              border: '1px solid #e00',
              padding: '0.5em',
              background: '#fff0f0',
              borderRadius: '4px',
            }}
          >
            <span>Error: {errorMessage}</span>
            <button onClick={onClearError}>Dismiss Error Message</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodosPage;
