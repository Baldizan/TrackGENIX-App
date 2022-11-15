import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_EMPLOYEES_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case DELETE_EMPLOYEES_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case DELETE_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        isPending: false
      };
    }
    case DELETE_EMPLOYEES_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case PUT_EMPLOYEES_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case PUT_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        isPending: false,
        error: false
      };
    }
    case PUT_EMPLOYEES_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case POST_EMPLOYEES_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case POST_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false,
        error: false
      };
    }
    case POST_EMPLOYEES_ERROR: {
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
