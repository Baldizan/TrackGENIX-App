import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './List.module.css';
import Button from '../../Shared/Button';
import Table from '../../Shared/Table';
import Modal from '../../Shared/Modal';

const List = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [list, setList] = useState([]);
  const history = useHistory();
  const headers = {
    _id: 'Task ID',
    projectName: 'Project Name',
    employeeFormat: 'Employee',
    taskDescription: 'Task Description',
    description: 'Description',
    date: 'Date',
    hours: 'Hours'
  };

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

  return (
    <section className={styles.container}>
      <Table
        headers={headers}
        data={list.map((row) => ({
          ...row,
          date: row.date.slice(0, 10),
          project: row.project?._id,
          task: row.task?._id,
          employee: row.employee?._id,
          projectName: row.project?.name ?? 'N/A',
          taskDescription: row.task?.description ?? 'N/A',
          employeeFormat: row.employee ? `${row.employee?.name} ${row.employee?.lastName}` : 'N/A'
        }))}
        editItem={handleEdit}
        deleteItem={deleteItem}
        title="Timesheets"
        addRedirectLink="/time-sheets/form"
        itemsPerPage={5}
      />
      {modalDisplay && (
        <Modal
          heading="Are you sure you want to delete this timesheet?"
          setModalDisplay={setModalDisplay}
          theme="confirm"
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