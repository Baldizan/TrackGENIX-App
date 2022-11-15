import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  PUT_PROJECT_PENDING,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR
} from './types';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const postProjectPending = () => {
  return {
    type: POST_PROJECT_PENDING
  };
};

export const postProjectSuccess = (data) => {
  return {
    type: POST_PROJECT_SUCCESS,
    payload: data
  };
};

export const postProjectError = (error) => {
  return {
    type: POST_PROJECT_ERROR,
    payload: error
  };
};
export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECT_PENDING
  };
};

export const deleteProjectSuccess = (data) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: data
  };
};

export const deleteProjectError = (error) => {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: error
  };
};
export const putProjectPending = () => {
  return {
    type: PUT_PROJECT_PENDING
  };
};

export const putProjectSuccess = (data) => {
  return {
    type: PUT_PROJECT_SUCCESS,
    payload: data
  };
};

export const putProjectError = (error) => {
  return {
    type: PUT_PROJECT_ERROR,
    payload: error
  };
};
