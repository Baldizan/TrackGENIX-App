import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR
} from './types';

const initialState = {
  isPending: false,
  authenticated: { role: '' },
  error: '',
  user: {}
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isPending: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isPending: false
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case LOGOUT_PENDING: {
      return {
        ...state,
        isPending: true,
        error: initialState.error
      };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isPending: false
      };
    }
    case GET_USER_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isPending: false,
        error: false
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
