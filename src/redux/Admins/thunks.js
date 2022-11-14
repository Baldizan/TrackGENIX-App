import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      dispatch(getAdminsSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`),
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        };
      dispatch(deleteAdminSuccess(id));
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};
