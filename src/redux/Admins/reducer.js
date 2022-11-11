import { GET_ADMINS_ERROR, GET_ADMINS_PENDING, GET_ADMINS_SUCCESS } from './types';

const INITIAL_STATE = {
  list: [],
  pending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    }
    case GET_ADMINS_ERROR: {
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
