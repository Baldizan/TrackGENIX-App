import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR
} from './types';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeePending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeeSuccess = (data) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};

export const putEmployeePending = () => {
  return {
    type: PUT_EMPLOYEES_PENDING
  };
};

export const putEmployeeSuccess = (data) => {
  return {
    type: PUT_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const putEmployeeError = (error) => {
  return {
    type: PUT_EMPLOYEES_ERROR,
    payload: error
  };
};

export const postEmployeePending = () => {
  return {
    type: POST_EMPLOYEES_PENDING
  };
};

export const postEmployeeSuccess = (data) => {
  return {
    type: POST_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const postEmployeeError = (error) => {
  return {
    type: POST_EMPLOYEES_ERROR,
    payload: error
  };
};
