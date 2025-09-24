import styles from './TodoList.module.css';
import TodoListItem from './TodoListItem';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  }
  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      <ul className={styles.list}>
        {filteredTodoList
          .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
          .map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
      </ul>
      <div className="paginationControls">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span>
          {' '}
          Page {currentPage} of {totalPages}{' '}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TodoList;
