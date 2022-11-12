import { GET_TASKS_PENDING, GET_TASKS_SUCCESS, GET_TASKS_ERROR } from './types';

export const getAdminsPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};
