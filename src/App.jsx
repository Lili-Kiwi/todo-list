import { useState } from 'react';
import ToDoList from './ToDoList';
import TodoForm from './TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (title) => {
    console.log('todo => ', title);
    const newTodo = {
      id: Date.now(),
      title,
    };
    console.log('New todo added => ', newTodo);
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div>
      <h1>Todos list</h1>
      <TodoForm addTodo={addTodo} />
      <ToDoList todoList={todoList} />
    </div>
  );
}

export default App;
