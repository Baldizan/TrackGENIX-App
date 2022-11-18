import { GET_EMPLOYEES_ERROR, GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS } from './types';

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
        isPending: true,
        error: false
      };
    }
    case GET_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false,
        error: false
      };
    }
    case GET_EMPLOYEES_ERROR: {
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
