import { GET_SUPERADMINS_ERROR, GET_SUPERADMINS_PENDING, GET_SUPERADMINS_SUCCESS } from './types';

const INITIAL_STATE = {
  list: [],
  pending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING: {
      return {
        ...state,
        list: action.payload,
        isPending: false
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
        list: action.payload,
        isPending: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
