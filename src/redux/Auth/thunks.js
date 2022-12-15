import {
  loginPending,
  loginSuccess,
  loginError,
  logoutPending,
  logoutError,
  logoutSuccess,
  getUserPending,
  getUserSuccess,
  getUserError
} from './actions';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export const login = (inputData) => {
  return async (dispatch) => {
    await dispatch(loginPending());
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      const {
        token,
        claims: { role, email }
      } = await userCredentials.user.getIdTokenResult();
      const userData = await dispatch(fetchUser(role, email, token));
      if (userData?.payload?.active) {
        sessionStorage.setItem('token', token);
        await dispatch(loginSuccess());
        return { error: false, role: role, message: 'Logged in succesfully' };
      } else {
        dispatch(logout());
        return { error: true, role: null, message: 'Inactive account' };
      }
    } catch {
      return dispatch(loginError());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await dispatch(logoutPending());
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

export const fetchUser = (role, email, token) => {
  return async (dispatch) => {
    dispatch(getUserPending());
    const URL = {
      SUPERADMIN: `${process.env.REACT_APP_API_URL}/super-admins`,
      ADMIN: `${process.env.REACT_APP_API_URL}/admins`,
      EMPLOYEE: `${process.env.REACT_APP_API_URL}/employees`
    };
    return await fetch(`${URL[role]}/?email=${email}`, {
      method: 'GET',
      headers: {
        token: token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        return dispatch(getUserSuccess(response.data[0]));
      })
      .catch((error) => {
        return dispatch(getUserError(error.toString()));
      });
  };
};
