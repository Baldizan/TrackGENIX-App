import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_SUPERADMINS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_SUPERADMINS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case POST_SUPERADMINS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case POST_SUPERADMINS_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    }
    case POST_SUPERADMINS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case DELETE_SUPERADMINS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case DELETE_SUPERADMINS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case DELETE_SUPERADMINS_ERROR: {
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
