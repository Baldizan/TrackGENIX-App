import {
  loginPending,
  loginSuccess,
  loginError,
  logoutPending,
  logoutError,
  logoutSuccess
} from './actions';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    const fetchUser = async (role, userEmail) => {
      const URL = {
        SUPERADMIN: `${process.env.REACT_APP_API_URL}/super-admins`,
        ADMIN: `${process.env.REACT_APP_API_URL}/admins`,
        EMPLOYEE: `${process.env.REACT_APP_API_URL}/employees`
      };
      try {
        const response = await fetch(`${URL[role]}`);
        const data = await response.json();
        const user = data.data.filter((item) => item.email === userEmail);
        return user[0];
      } catch (error) {
        dispatch(loginError(error.toString()));
      }
    };

    dispatch(loginPending());
    return signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        const userData = await fetchUser(role, credentials.email);
        return dispatch(
          loginSuccess({
            role,
            token,
            data: userData || 'User not found'
          })
        );
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return signOut(auth)
      .then(() => {
        sessionStorage.clear();
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};
