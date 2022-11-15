import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from './types';
import {
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
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
