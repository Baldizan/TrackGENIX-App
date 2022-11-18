import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR
} from './types';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPERADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (data) => {
  return {
    type: POST_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const postSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = () => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: POST_SUPERADMINS_ERROR,
    payload: error
  };
};
export const putSuperAdminsPending = () => {
  return {
    type: PUT_SUPERADMINS_PENDING
  };
};

export const putSuperAdminsSuccess = (data) => {
  return {
    type: PUT_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const putSuperAdminsError = (error) => {
  return {
    type: PUT_SUPERADMINS_ERROR,
    payload: error
  };
};
