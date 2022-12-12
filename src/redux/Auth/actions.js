import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR
} from './types';
export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const getUserPending = () => {
  return {
    type: GET_USER_PENDING
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  };
};

export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error
  };
};
