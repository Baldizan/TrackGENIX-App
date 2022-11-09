import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './List.module.css';
import Button from '../../Shared/Button';
import Table from '../../Shared/Table';
import Modal from '../../Shared/Modal';

const List = () => {
  const [displayRange, setDisplayRange] = useState({ x: 0, y: 5, z: 0 });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
  }, []);

  const deleteItem = (_id) => {
    setModalDisplay(true);
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${_id}`, {
      method: 'delete'
    }).then(() => {
      setList([...list.filter((listItem) => listItem._id !== _id)]);
    });
  };
  const handleEdit = () => {
    list.map((item) =>
      history.push(`/time-sheets/form`, {
        ...item,
        project: item.project,
        task: item.task,
        employee: item.employee
      })
    );
  };
  const headers = ['_id', 'project', 'employee', 'task', 'description', 'date', 'hours'];
  return (
    <section className={styles.container}>
      <Button label={'Add new task +'} onClick={() => history.push('/time-sheets/form')} />
      <Table
        headers={headers}
        data={list
          .map((row) => ({
            ...row,
            date: row.date.slice(0, 10),
            project: row.project?.name,
            task: row.task?.description,
            employee: row.employee ? `${row.employee?.name} ${row.employee?.lastName}` : 'N/A'
          }))
          .slice(displayRange.x, displayRange.y)}
        editItem={handleEdit}
        deleteItem={deleteItem}
      />
      <div className={styles.nav}>
        <Button
          onClick={() =>
            setDisplayRange({
              x: displayRange.x - 5,
              y: displayRange.y - 5,
              z: displayRange.z - 1
            })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
          hidden={displayRange.x === 0}
        />
        <p>{displayRange.z}</p>
        <Button
          onClick={() =>
            setDisplayRange({
              x: displayRange.x + 5,
              y: displayRange.y + 5,
              z: displayRange.z + 1
            })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-right-solid.svg`}
          hidden={list.slice(displayRange.x + 5, displayRange.y + 5).length === 0}
        />
      </div>
      {modalDisplay && (
        <Modal
          heading={'Are you sure you want to delete this timesheet?'}
          setModalDisplay={setModalDisplay}
          theme={'confirm'}
        >
          <Button label="Confirm" theme="tertiary" onClick={() => {}} />
        </Modal>
      )}
    </section>
  );
};

export default List;
