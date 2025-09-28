import TextInputWithLabel from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';
import { useState, useEffect } from 'react';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  return (
    <li className={todo.isCompleted ? styles.itemCompleted : styles.item}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
        <div className={styles.actions}>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </form>
    </li>
  );
}

export default TodoListItem;
