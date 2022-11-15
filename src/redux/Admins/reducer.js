import {
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  POST_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_ADMINS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case DELETE_ADMIN_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isPending: false
      };
    case DELETE_ADMIN_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case PUT_ADMIN_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        isPending: false
      };
    case PUT_ADMIN_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case POST_ADMIN_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case POST_ADMIN_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
