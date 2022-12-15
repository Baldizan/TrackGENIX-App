import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  const { role } = useSelector((state) => state.auth.authenticated);
  const userLogged = Boolean(role);

  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <Link to="/">
          <img
            className={styles.logoTG}
            src={`${process.env.PUBLIC_URL}/assets/images/logoTG.svg`}
          />
        </Link>
        {userLogged && !location.pathname !== '/login' ? (
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
