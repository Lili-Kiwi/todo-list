import ToDoList from './ToDoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

function App() {
  const [newTodo, setnewTodo] = useState('example text');

  return (
    <div>
      <h1>Todos list</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <ToDoList />
    </div>
  );
}

export default App;
