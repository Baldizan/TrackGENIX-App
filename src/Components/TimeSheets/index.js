import React, { useEffect, useState } from 'react';
import List from './List/List';

import styles from './time-sheets.module.css';

const TimeSheets = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
  }, []);

  const deleteItem = (_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${_id}`, {
      method: 'delete'
    }).then(() => {
      setList([...list.filter((listItem) => listItem._id !== _id)]);
    });
  };

  return (
    <section className={styles.container}>
      <List list={list} setList={setList} deleteItem={deleteItem} />
    </section>
  );
};

export default TimeSheets;
