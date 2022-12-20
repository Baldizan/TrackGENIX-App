import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUser } from 'redux/Auth/thunks';
import styles from './home.module.css';
import Button from '../Button';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    if (!user.email) {
      dispatch(fetchUser(role, email, token));
    }
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.welcomeTitle}>
        Welcome, {user.name} {user.lastName}!
      </h2>
      <div className={styles.welcome}>
        <img
          className={styles.homeImage}
          src={`${process.env.PUBLIC_URL}/assets/images/home.png`}
        />
        <section className={styles.buttonsContainer}>
          <h3 className={styles.buttonsTitle}>What would you like to do today?</h3>
          {role === 'EMPLOYEE' && (
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
          {role === 'ADMIN' && (
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
          {role === 'SUPERADMIN' && (
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
    </div>
  );
};

export default Home;
