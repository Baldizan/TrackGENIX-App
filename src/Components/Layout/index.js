import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './layout.module.css';
import Routes from 'routes';
import Header from 'Components/Header';
import Loader from 'Components/Shared/Loader';
import Footer from 'Components/Footer';

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
