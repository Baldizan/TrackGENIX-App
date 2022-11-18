import { GET_PROJECTS_ERROR, GET_PROJECTS_PENDING, GET_PROJECTS_SUCCESS } from './types';

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
        isPending: false,
        error: false
      };
    }
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false,
        error: false
      };
    }
    case GET_PROJECTS_ERROR: {
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
