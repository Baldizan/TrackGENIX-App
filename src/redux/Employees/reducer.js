import { GET_EMPLOYEES_ERROR, GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS } from './types';
import {
  DELETE_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS
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
    default:
      return state;
  }
};

export default reducer;
