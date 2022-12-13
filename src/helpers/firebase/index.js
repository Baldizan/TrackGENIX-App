import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, getIdTokenResult } from 'firebase/auth';
import { setAuthentication } from 'redux/Auth/actions';
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
        } = await getIdTokenResult(user);
        if (token) {
          store.dispatch(setAuthentication({ role, email }));
          sessionStorage.setItem('token', token);
        }
      } catch (error) {
        console.log('error');
      }
    }
  });
};
