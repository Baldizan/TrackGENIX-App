import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './List.module.css';
import Button from '../../Shared/Button';
import Table from '../../Shared/Table';
import Modal from '../../Shared/Modal';

const List = () => {
  const [displayRange, setDisplayRange] = useState({ x: 0, y: 5, z: 0 });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
  }, []);

  const deleteItem = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${selectedItem._id}`, {
      method: 'delete'
    }).then(() => {
      setList([...list.filter((listItem) => listItem._id !== selectedItem._id)]);
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    history.push(`/time-sheets/form`, {
      ...item,
      project: item.project,
      task: item.task,
      employee: item.employee
    });
  };
  const headers = ['_id', 'project', 'employee', 'task', 'description', 'date', 'hours'];
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Timesheet</h2>
        <Button
          style={styles.addButton}
          label={'Add new timesheet +'}
          onClick={() => history.push('/time-sheets/form')}
        />
      </header>
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
          <Button
            label="Confirm"
            theme="tertiary"
            onClick={() => {
              handleDelete();
              setModalDisplay(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default List;
