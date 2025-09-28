import styles from './App.module.css';
import errorIcon from './assets/error.svg';
import { useEffect, useCallback, useReducer, useState } from 'react';
import ToDoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import './App.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // useReducer for todos state
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  // Local state for sort and search controls
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const isCompleted = false;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        const { records } = await resp.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString, encodeUrl, token]);

  const addTodo = async (title) => {
    const newTodo = {
      title,
      isCompleted,
    };
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      const { records } = await resp.json();
      if (!resp.ok) {
        throw new Error(
          `Failed to save todo: ${resp.status} ${resp.statusText}`
        );
      }
      dispatch({ type: todoActions.addTodo, record: records[0] });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const showMessage =
    todoState.todoList.length > 0 &&
    todoState.todoList.every((todo) => todo.isCompleted)
      ? 'Add todo above to get started'
      : null;

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    const editedTodo = { ...originalTodo, isCompleted: true };
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: editedTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(
          `Failed to update todo: ${resp.status} ${resp.statusText}`
        );
      }
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );
      if (!resp.ok) {
        throw new Error(
          `Failed to update todo: ${resp.status} ${resp.statusText}`
        );
      }
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos list</h1>
      <TodoForm addTodo={addTodo} isSaving={todoState.isSaving} />
      <ToDoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
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
      {todoState.isLoading && <p>Loading...</p>}
      {showMessage}
      {todoState.errorMessage && (
        <>
          <hr />
          <div
            className={styles.errorMessage}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
          >
            <img src={errorIcon} alt="Error" width={20} height={20} />
            <span>Error: {todoState.errorMessage}</span>
            <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss Error Message
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
