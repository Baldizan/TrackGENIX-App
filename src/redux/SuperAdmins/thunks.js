import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError
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

export const deleteSuperAdmins = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteSuperAdminsSuccess());
        dispatch(getSuperAdmins());
      })
      .catch((error) => {
        dispatch(deleteSuperAdminsError(error.message));
      });
  };
};

export const putSuperAdmins = (id, data, token) => {
  return (dispatch) => {
    dispatch(putSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'put',
      headers: {
        token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        lastName: data.lastName,
        name: data.name,
        password: data.password
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(putSuperAdminsError(json.message));
        } else {
          dispatch(putSuperAdminsSuccess(json.message));
          dispatch(getSuperAdmins());
        }
      })
      .catch((error) => {
        dispatch(putSuperAdminsError(error.message));
      });
  };
};
