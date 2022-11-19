import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Loader from 'Components/Shared/Loader';
import Routes from './routes';
import Footer from '../Footer/index';

function Layout() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Router>
          <Header />
          <Routes />
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default Layout;
