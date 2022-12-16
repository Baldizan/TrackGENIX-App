import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'redux/Auth/thunks.js';
import styles from './header.module.css';
import Button from '../Shared/Button';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.authenticated);
  const userLogged = Boolean(role);
  const [navbarDisplay, setNavBarDisplay] = useState(true);
  const onClickLogout = () => {
    dispatch(logout());
    history.push('/home');
  };

  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <img
            className={styles.logoTG}
            src={`${process.env.PUBLIC_URL}/assets/images/logoTG.svg`}
          />
        </Link>
        <Button
          label="Log out"
          onClick={onClickLogout}
          theme="noBorderSecondary"
          disabled={!userLogged}
          hidden={!userLogged}
          style={styles.authButtons}
        />
        {!userLogged && (
          <div className={styles.authButtonsContainer}>
            <Button
              label="Log in"
              onClick={() => history.push('/login')}
              theme="noBorderSecondary"
              style={styles.authButtons}
            />
            <Button
              label="Register"
              onClick={() => history.push('/register')}
              theme="noBorderSecondary"
              style={styles.authButtons}
            />
          </div>
        )}
      </div>
      {userLogged && !location.pathname !== '/login' ? (
        <>
          <nav className={`${styles.navbar} ${!navbarDisplay && styles.hidden}`}>
            <ul className={styles.routes}>
              {role === 'EMPLOYEE' && (
                <>
                  <li>
                    <Link to="/employee/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/employee/projects">My projects</Link>
                  </li>
                  <li>
                    <Link to="/employee/time-sheets">My time-sheets</Link>
                  </li>
                  <li>
                    <Link to="/employee/profile">My profile</Link>
                  </li>
                </>
              )}
              {role === 'ADMIN' && (
                <>
                  <li>
                    <Link to="/admin/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/admin/employees">Employees</Link>
                  </li>
                  <li>
                    <Link to="/admin/projects">Projects</Link>
                  </li>
                  <li>
                    <Link to="/admin/time-sheets">Time-sheets</Link>
                  </li>
                  <li>
                    <Link to="/admin/tasks">Tasks</Link>
                  </li>
                  <li>
                    <Link to="/admin/profile">My profile</Link>
                  </li>
                </>
              )}
              {role === 'SUPERADMIN' && (
                <>
                  <li>
                    <Link to="/superadmin/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/superadmin/admins">Admins</Link>
                  </li>
                  <li>
                    <Link to="/superadmin/profile">My profile</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className={styles.buttonContainer}>
            <Button
              icon={
                navbarDisplay
                  ? `${process.env.PUBLIC_URL}/assets/images/angle-up-solid.svg`
                  : `${process.env.PUBLIC_URL}/assets/images/angle-down-solid.svg`
              }
              style={styles.navButton}
              onClick={() => setNavBarDisplay(!navbarDisplay)}
              hidden={!userLogged}
              disabled={!userLogged}
            />
          </div>
        </>
      ) : null}
    </header>
  );
};

export default Header;
