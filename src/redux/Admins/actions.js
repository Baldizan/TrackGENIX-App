import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR
} from './types';

const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

const getAdminsSuccess = (data) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
};

const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

const deleteAdminPending = () => {
  return {
    type: DELETE_ADMIN_PENDING
  };
};

const deleteAdminSuccess = (data) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payload: data
  };
};

const deleteAdminError = (error) => {
  return {
    type: DELETE_ADMIN_ERROR,
    payload: error
  };
};

const putAdminPending = () => {
  return {
    type: PUT_ADMIN_PENDING
  };
};

const putAdminSuccess = () => {
  return {
    type: PUT_ADMIN_SUCCESS
  };
};

const putAdminError = (error) => {
  return {
    type: PUT_ADMIN_ERROR,
    payload: error
  };
};

const postAdminPending = () => {
  return {
    type: POST_ADMIN_PENDING
  };
};

const postAdminSuccess = (data) => {
  return {
    type: POST_ADMIN_SUCCESS,
    payload: data
  };
};

const postAdminError = (error) => {
  return {
    type: POST_ADMIN_ERROR,
    payload: error
  };
};

export {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  putAdminPending,
  putAdminSuccess,
  putAdminError,
  postAdminPending,
  postAdminSuccess,
  postAdminError
};
