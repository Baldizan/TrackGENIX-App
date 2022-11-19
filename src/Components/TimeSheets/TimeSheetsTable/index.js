import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from '../../../redux/TimeSheets/thunks';
import styles from './List.module.css';
import Button from '../../Shared/Button';
import Table from '../../Shared/Table';
import Modal from '../../Shared/Modal';

const List = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { list: timesheetList, isPending, error } = useSelector((state) => state.timesheets);
  const dispatch = useDispatch();
  const history = useHistory();
  const headers = {
    projectName: 'Project Name',
    employeeFormat: 'Employee',
    taskDescription: 'Task Description',
    description: 'Description',
    date: 'Date',
    hours: 'Hours'
  };

  const timeSheetData = () => {
    return timesheetList.map((row) => {
      return {
        ...row,
        date: row.date.slice(0, 10),
        project: row.project?._id,
        task: row.task?._id,
        employee: row.employee?._id,
        projectName: row.project?.name ?? 'N/A',
        taskDescription: row.task?.description ?? 'N/A',
        employeeFormat: row.employee ? `${row.employee?.name} ${row.employee?.lastName}` : 'N/A'
      };
    });
  };

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const deleteItem = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${selectedItem._id}`, {
      method: 'delete'
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
      {isPending && <p>...Loading</p>}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={timeSheetData()}
          editItem={handleEdit}
          deleteItem={deleteItem}
          title="Timesheets"
          addRedirectLink="/time-sheets/form"
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
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
