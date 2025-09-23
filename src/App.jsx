import styles from './App.module.css';
import { useEffect, useCallback, useReducer, useState } from 'react';
import TodosPage from './TodosPage';
import './App.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';
import Header from './shared/Header';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router';
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const isCompleted = false;
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Todo List');

  useEffect(() => {
    if (location.pathname === '/') {
      setPageTitle('Todo List');
    } else if (location.pathname === '/about') {
      setPageTitle('About');
    } else {
      setPageTitle('Not Found');
    }
  }, [location]);

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
    <>
      <div className={styles.container}>
        <Header title={pageTitle} />
        <Routes>
          <Route
            path="/"
            element={
              <TodosPage
                addTodo={addTodo}
                isSaving={todoState.isSaving}
                todoList={todoState.todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                queryString={queryString}
                setQueryString={setQueryString}
                isLoading={todoState.isLoading}
                showMessage={showMessage}
                errorMessage={todoState.errorMessage}
                onClearError={() => dispatch({ type: todoActions.clearError })}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/\*" element={<NotFound />} />
        </Routes>
      </div>{' '}
    </>
  );
}

export default App;
