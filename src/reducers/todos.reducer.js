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
      return { ...state, isLoading: true, errorMessage: null };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.payload,
        isLoading: false,
        errorMessage: null,
      };
    case actions.setLoadError:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        errorMessage: action.payload,
      };
    case actions.startRequest:
      return { ...state, isSaving: true };
    case actions.addTodo:
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
        isSaving: false,
      };
    case actions.endRequest:
      return { ...state, isSaving: false };
    case actions.updateTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case actions.completeTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? { ...todo, isCompleted: true } : todo
        ),
      };
    case actions.revertTodo:
      return { ...state, todoList: action.payload };
    case actions.clearError:
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

export { initialState, actions, reducer };
