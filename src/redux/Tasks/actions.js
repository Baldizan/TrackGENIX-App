import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  PUT_TASK_PENDING,
  PUT_TASK_SUCCESS,
  PUT_TASK_ERROR
} from './types';

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

export const postTaskPending = () => {
  return {
    type: POST_TASK_PENDING
  };
};

export const postTaskSuccess = (data) => {
  return {
    type: POST_TASK_SUCCESS,
    payload: data
  };
};

export const postTaskError = (error) => {
  return {
    type: POST_TASK_ERROR,
    payload: error
  };
};
export const deleteTaskPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

export const deleteTaskSuccess = (data) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: data
  };
};

export const deleteTaskError = (error) => {
  return {
    type: DELETE_TASK_ERROR,
    payload: error
  };
};
export const putTaskPending = () => {
  return {
    type: PUT_TASK_PENDING
  };
};

export const putTaskSuccess = (data) => {
  return {
    type: PUT_TASK_SUCCESS,
    payload: data
  };
};

export const putTaskError = (error) => {
  return {
    type: PUT_TASK_ERROR,
    payload: error
  };
};
