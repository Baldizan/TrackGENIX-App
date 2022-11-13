import {
  CLOSE_MODAL_MESSAGE,
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS
} from './types';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: '',
  showModal: false,
  modalContent: { title: '', message: '' }
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
        isPending: false,
        modalContent: { title: action.title, message: `${action.payload}` },
        showModal: true
      };
    }
    case CLOSE_MODAL_MESSAGE: {
      return {
        ...state,
        modalContent: { title: '', message: '' },
        showModal: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
