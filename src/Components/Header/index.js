import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'redux/Auth/thunks.js';
import styles from './header.module.css';
import Button from '../Shared/Button';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const [navbarDisplay, setNavBarDisplay] = useState(true);
  const userLogged = Boolean(authenticated.token);
  const onClickLogout = () => {
    dispatch(logout());
    history.push('/home');
  };

  return (
    <header>
      <div className={styles.container}>
        <p className={styles.brand}>
          <Link to="/">
            Track<span className={styles.capitalized}>genix</span>
          </Link>
        </p>
        <div className={styles.authButtonsContainer}>
          <Button
            label={'Register'}
            onClick={() => history.push('/register')}
            theme={'secondary'}
          />
          <Button
            label={userLogged ? 'Log out' : 'Log in'}
            onClick={userLogged ? () => onClickLogout() : () => history.push('/login')}
            theme={userLogged ? 'primary' : 'secondary'}
          />
        </div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
      {userLogged === 'EMPLOYEE' ? (
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
}

export default Header;
