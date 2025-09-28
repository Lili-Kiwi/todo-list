const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: null,
};

const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.fetchTodos:
      return { ...state, isLoading: true };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map((record) => ({
          id: record.id,
          ...record.fields,
        })),
        isLoading: false,
      };
    case actions.startRequest:
      return { ...state, isSaving: true };
    case actions.addTodo: {
      const savedTodo = {
        id: action.record.id,
        ...action.record.fields,
        isCompleted:
          typeof action.record.fields.isCompleted === 'boolean'
            ? action.record.fields.isCompleted
            : false,
      };
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }
    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };
    case actions.revertTodo: // fall through to updateTodo
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id
          ? { ...todo, ...action.editedTodo }
          : todo
      );
      const updatedState = {
        ...state,
        todoList: updatedTodos,
      };
      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }
      return updatedState;
    }
    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );
      return {
        ...state,
        todoList: updatedTodos,
      };
    }
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.clearError:
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

export { initialState, actions, reducer };
