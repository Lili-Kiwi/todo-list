import { useState } from 'react';
import ToDoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  let isCompleted = false;
  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted,
    };
    setTodoList([...todoList, newTodo]);
  };

  const showMessage =
    todoList.length > 0 ? null : 'Add todo above to get started';
  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id == id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);
  }

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id == editedTodo.id) {
        return { ...todo, title: editedTodo.title };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);
  };
  
  return (
    <div>
      <h1>Todos list</h1>
      <TodoForm addTodo={addTodo} />
      <ToDoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {showMessage}
    </div>
  );
}

export default App;
