import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(getSuperAdminsError(json.message));
        } else {
          dispatch(getSuperAdminsSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.message));
      });
  };
};

export const postSuperAdmins = (data) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(postSuperAdminsError(json.message));
        } else {
          dispatch(postSuperAdminsSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminsError(error.message));
      });
  };
};
