import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import {
  setAuthentication,
  loginError,
  logoutPending,
  logoutSuccess,
  logoutError
} from 'redux/Auth/actions';
import store from 'redux/store';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      try {
        const {
          token,
          claims: { role, email }
        } = await user.getIdTokenResult();
        if (token) {
          store.dispatch(setAuthentication({ role: role, email: email, token: token }));
          sessionStorage.setItem('token', token);
        }
      } catch (error) {
        store.dispatch(loginError(error));
      }
    } else {
      store.dispatch(logoutPending());
      try {
        store.dispatch(logoutSuccess());
      } catch (error) {
        store.dispatch(logoutError(error));
      }
    }
  });
};
