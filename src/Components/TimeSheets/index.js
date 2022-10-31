import React, { useEffect, useState } from 'react';
import List from './List/List';
import AddItem from './AddItem/AddItem';

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

  const addItem = ({ project, task, description, date, hours }) => {
    const newItem = {
      project,
      task,
      description,
      date,
      hours
    };
    console.log('nnuevo', newItem);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('http://localhost:5000/timeSheets', {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(newItem)
    }).then(() => {
      fetch('http://localhost:5000/timesheets')
        .then((res) => res.json())
        .then((json) => {
          console.log('data', json);
          setList(json.data);
        });
    });
  };

  return (
    <section className={styles.container}>
      <List list={list} setList={setList} deleteItem={deleteItem} />
      <AddItem addItem={addItem} />
    </section>
  );
};

export default TimeSheets;
