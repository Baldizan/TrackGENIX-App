import { getSuperAdminsError, getSuperAdminsPending, getSuperAdminsSuccess } from './actions';

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
