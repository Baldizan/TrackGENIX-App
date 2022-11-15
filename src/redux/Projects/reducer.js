import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  PUT_PROJECT_PENDING,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_PROJECTS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case POST_PROJECT_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case POST_PROJECT_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case POST_PROJECT_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case DELETE_PROJECT_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case DELETE_PROJECT_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    case PUT_PROJECT_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case PUT_PROJECT_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case PUT_PROJECT_ERROR: {
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
