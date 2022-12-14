import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'redux/Auth/thunks.js';
import styles from './header.module.css';
import Button from '../Shared/Button';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.authenticated.role);
  const [navbarDisplay, setNavBarDisplay] = useState(true);
  const onClickLogout = () => {
    dispatch(logout());
    history.push('/home');
    sessionStorage.clear();
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
        {!userLogged && (
          <div className={styles.authButtonsContainer}>
            <Button
              label={'Log in'}
              onClick={() => history.push('/login')}
              theme="noBorderSecondary"
            />
            <Button
              label={'Register'}
              onClick={() => history.push('/register')}
              theme="noBorderSecondary"
            />
          </div>
        )}
        {userLogged && (
          <Button
            label={'Log out'}
            onClick={onClickLogout}
            theme="primary"
            style={styles.authButtons}
          />
        )}
      </div>
      {userLogged ? (
        <nav className={`${styles.navbar} ${!navbarDisplay && styles.hidden}`}>
          <ul className={styles.routes}>
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
          </ul>
        </nav>
      ) : null}
      <div className={styles.buttonContainer}>
        <Button
          icon={
            navbarDisplay
              ? `${process.env.PUBLIC_URL}/assets/images/angle-up-solid.svg`
              : `${process.env.PUBLIC_URL}/assets/images/angle-down-solid.svg`
          }
          style={styles.navButton}
          onClick={() => setNavBarDisplay(!navbarDisplay)}
          hidden={Boolean(!userLogged)}
          disabled={Boolean(!userLogged)}
        />
      </div>
    </header>
  );
};

export default Header;
