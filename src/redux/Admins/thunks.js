import { getAdminsError, getAdminsPending, getAdminsSuccess } from './actions';

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
