import React, { useEffect, useState } from 'react';
import List from './List/List';
// import AddItem from './AddItem/AddItem';
// import EditItem from './EditItem/EditItem';

import styles from './time-sheets.module.css';

const TimeSheets = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/timesheets')
      .then((res) => res.json())
      .then((json) => {
        console.log('data', json);
        setList(json.data);
      });
  }, []);

  const deleteItem = (_id) => {
    fetch(`http://localhost:5000/timesheets/${_id}`, {
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
