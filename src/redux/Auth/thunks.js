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
    return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        return dispatch(
          loginSuccess({
            role,
            token,
            data: 'Welcome!'
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
