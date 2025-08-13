import { useState } from 'react';
import ToDoList from './ToDoList';
import TodoForm from './TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  let isCompleted = false;
  const addTodo = (title) => {
    console.log('todo => ', title);
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted,
    };
    console.log('New todo added => ', newTodo);
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

  return (
    <div>
      <h1>Todos list</h1>
      <TodoForm addTodo={addTodo} />
      <ToDoList todoList={todoList} onCompleteTodo={completeTodo} />
      {showMessage}
    </div>
  );
}

export default App;
