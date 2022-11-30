import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, getIdTokenResult } from 'firebase/auth';
import { cleanError, setAuthentication } from 'redux/Auth/actions';
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
      const URL = {
        SUPERADMIN: `${process.env.REACT_APP_API_URL}/super-admins`,
        ADMIN: `${process.env.REACT_APP_API_URL}/admins`,
        EMPLOYEE: `${process.env.REACT_APP_API_URL}/employees`
      };
      try {
        const {
          token,
          claims: { role, email }
        } = await getIdTokenResult(user);
        const userData = await fetch(`${URL[role]}/?email=${email}`)
          .then((res) => res.json())
          .then((json) => json.data);
        if (token) {
          store.dispatch(setAuthentication({ role: role, token: token, data: userData[0] }));
          sessionStorage.setItem('token', token);
        }
      } catch (error) {
        store.dispatch(cleanError(error));
      }
    }
  });
};
