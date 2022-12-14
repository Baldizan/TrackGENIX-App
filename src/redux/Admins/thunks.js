import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  putAdminError,
  putAdminPending,
  putAdminSuccess,
  postAdminError,
  postAdminPending,
  postAdminSuccess
} from './actions';

export const getAdmins = (token) => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        headers: {
          token: token
        }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      }
      dispatch(getAdminsSuccess(json.data, json.message));
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error();
      }
      dispatch(deleteAdminSuccess(id));
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};

export const editAdmin = (id, data) => {
  return async (dispatch) => {
    dispatch(putAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        })
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      }
      dispatch(putAdminSuccess(json.data, json.message));
      dispatch(getAdmins());
    } catch (error) {
      dispatch(putAdminError(error.toString()));
    }
  };
};

export const addAdmin = (data, token) => {
  return async (dispatch) => {
    dispatch(postAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      }
      dispatch(postAdminSuccess(json.data, json.message));
      dispatch(getAdmins());
    } catch (error) {
      dispatch(postAdminError(error.toString()));
    }
  };
};
