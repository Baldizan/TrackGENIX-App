import {
  loginPending,
  loginSuccess,
  loginError,
  logoutPending,
  logoutError,
  logoutSuccess
} from './actions';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export const login = (credentials) => {
  const auth = getAuth();
  return (dispatch) => {
    dispatch(loginPending());
    const fetchUser = async (role, userEmail) => {
      const URL = {
        SUPERADMIN: `${process.env.REACT_APP_API_URL}/super-admins`,
        ADMIN: `${process.env.REACT_APP_API_URL}/admins`,
        EMPLOYEE: `${process.env.REACT_APP_API_URL}/employees`
      };
      try {
        const user = await fetch(`${URL[role]}/?email=${userEmail}`)
          .then((res) => res.json())
          .then((json) => json.data);
        return user[0];
      } catch (error) {
        dispatch(loginError(error.toString()));
      }
    };
    return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
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
            data: userData ?? 'User not found'
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
