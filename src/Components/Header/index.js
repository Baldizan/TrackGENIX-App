import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import Button from '../Shared/Button';

function Header() {
  const [navbarDisplay, setNavBarDisplay] = useState(true);
  return (
    <header>
      <div className={styles.container}>
        <p className={styles.brand}>
          Track<span className={styles.capitalized}>genix</span>
        </p>
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
      <div className={styles.buttonContainer}>
        <Button
          icon={
            navbarDisplay
              ? `${process.env.PUBLIC_URL}/assets/images/angle-up-solid.svg`
              : `${process.env.PUBLIC_URL}/assets/images/angle-down-solid.svg`
          }
          style={styles.navButton}
          onClick={() => setNavBarDisplay(!navbarDisplay)}
        />
      </div>
    </header>
  );
}

export default Header;
