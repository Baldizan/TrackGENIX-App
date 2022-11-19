import {
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS
} from './types';

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
        isPending: true,
        error: false
      };
    }
    case GET_TIMESHEETS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false,
        error: false
      };
    }
    case GET_TIMESHEETS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case DELETE_TIMESHEET_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case DELETE_TIMESHEET_SUCCESS: {
      return {
        ...state,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        isPending: false,
        error: false
      };
    }
    case DELETE_TIMESHEET_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case POST_TIMESHEET_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case POST_TIMESHEET_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false,
        error: false
      };
    }
    case POST_TIMESHEET_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case PUT_TIMESHEET_PENDING: {
      return {
        ...state,
        isPending: true,
        error: false
      };
    }
    case PUT_TIMESHEET_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false,
        error: false
      };
    }
    case PUT_TIMESHEET_ERROR: {
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
