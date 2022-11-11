import { GET_TASKS_ERROR, GET_TASKS_PENDING, GET_TASKS_SUCCESS } from './types';

const INITIAL_STATE = {
  list: [],
  pending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_TASKS_ERROR: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
