import { GET_TIMESHEETS_ERROR, GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS } from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING: {
      return {
        ...state,
        list: action.payload,
        isPending: true
      };
    }
    case GET_TIMESHEETS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_TIMESHEETS_ERROR: {
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
