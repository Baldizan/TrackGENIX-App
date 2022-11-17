import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR
} from './types';

export const getTimeSheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimeSheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimeSheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const deleteTimeSheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimeSheetSuccess = (data) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const deleteTimeSheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};

export const postTimeSheetPending = () => {
  return {
    type: POST_TIMESHEET_PENDING
  };
};

export const postTimeSheetSuccess = (data) => {
  return {
    type: POST_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const postTimeSheetError = (error) => {
  return {
    type: POST_TIMESHEET_ERROR,
    payload: error
  };
};
