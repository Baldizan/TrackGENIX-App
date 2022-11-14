import { GET_ADMINS_ERROR, GET_ADMINS_PENDING, GET_ADMINS_SUCCESS } from './types';

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
        error: action.payload,
        isPending: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
