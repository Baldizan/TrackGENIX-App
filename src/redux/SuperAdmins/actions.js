import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR
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
    type: POST_SUPERADMINS_ERROR,
    payload: error
  };
};
