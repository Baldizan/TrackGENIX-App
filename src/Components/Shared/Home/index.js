import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUser } from 'redux/Auth/thunks';
import styles from './home.module.css';
import Button from '../Button';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, authenticated } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!user.email) {
      dispatch(fetchUser(authenticated.role, authenticated.email, token));
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h2 className={styles.welcomeTitle}>
          Welcome, {user.name} {user.lastName}!
        </h2>
        <img
          className={styles.homeImage}
          src={`${process.env.PUBLIC_URL}/assets/images/home.png`}
        />
      </div>
      <section className={styles.buttonsContainer}>
        {authenticated.role === 'EMPLOYEE' && (
          <>
            <Button
              style={styles.homeButtons}
              label="View your Projects"
              onClick={() => history.push('/employee/projects')}
            ></Button>
            <Button
              style={styles.homeButtons}
              label="View your Timehseets"
              onClick={() => history.push('/employee/time-sheets')}
            ></Button>
            <Button
              style={styles.homeButtons}
              label="View your Profile"
              onClick={() => history.push('/employee/profile')}
            ></Button>
          </>
        )}
        {authenticated.role === 'ADMIN' && (
          <>
            <Button
              style={styles.homeButtons}
              label="View Projects"
              onClick={() => history.push('/admin/projects')}
            ></Button>
            <Button
              style={styles.homeButtons}
              label="View Employees"
              onClick={() => history.push('/admin/employees')}
            ></Button>
            <Button
              style={styles.homeButtons}
              label="View Timesheets"
              onClick={() => history.push('/admin/time-sheets')}
            ></Button>
          </>
        )}
        {authenticated.role === 'SUPERADMIN' && (
          <>
            <Button
              style={styles.homeButtons}
              label="View Admins"
              onClick={() => history.push('/superadmin/admins')}
            ></Button>
            <Button
              style={styles.homeButtons}
              label="View your Profile"
              onClick={() => history.push('/superadmin/profile')}
            ></Button>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
