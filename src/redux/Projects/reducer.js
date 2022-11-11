import { GET_PROJECTS_ERROR, GET_PROJECTS_PENDING, GET_PROJECTS_SUCCESS } from './types';

const INITIAL_STATE = {
  list: [],
  pending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_PROJECTS_ERROR: {
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
