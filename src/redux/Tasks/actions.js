import { GET_TASKS_PENDING, GET_TASKS_SUCCESS, GET_TASKS_ERROR } from './types';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};
