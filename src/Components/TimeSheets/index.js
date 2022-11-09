import React from 'react';
import List from './List/List';
import styles from './time-sheets.module.css';

const TimeSheets = () => {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
};

export default TimeSheets;
