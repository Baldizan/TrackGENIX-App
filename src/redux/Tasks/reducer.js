import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  PUT_TASK_PENDING,
  PUT_TASK_SUCCESS,
  PUT_TASK_ERROR
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false,
        error: false
      };
    }
    case GET_TASKS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case POST_TASK_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case POST_TASK_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false,
        error: false
      };
    }
    case POST_TASK_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case DELETE_TASK_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        isPending: false,
        error: false
      };
    }
    case DELETE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case PUT_TASK_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case PUT_TASK_SUCCESS: {
      return {
        ...state,
        isPending: false,
        error: false
      };
    }
    case PUT_TASK_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
