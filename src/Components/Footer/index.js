import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          Track<span className={styles.capitalized}>genix</span>
        </div>
        {authenticated.role === 'EMPLOYEE' ? (
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
        ) : null}
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()} By GigaTech Software Solutions SA
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
    </footer>
  );
}

export default Footer;
