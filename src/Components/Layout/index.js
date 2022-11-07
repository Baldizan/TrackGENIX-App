import Header from '../Header/index';
import Footer from '../Footer/index';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Routes from './routes';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
