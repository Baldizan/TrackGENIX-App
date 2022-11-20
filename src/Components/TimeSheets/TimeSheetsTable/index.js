import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets, deleteTimeSheet } from 'redux/TimeSheets/thunks';
import styles from './List.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const List = () => {
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
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
    dispatch(getTimeSheets());
  }, []);

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalDisplay(true);
  };

  const showSuccessModal = () => {
    setSuccessModalDisplay(true);
  };

  const deleteItem = () => {
    showSuccessModal(true);
    dispatch(deleteTimeSheet(selectedItem._id));
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
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={timeSheetData()}
          editItem={handleEdit}
          deleteItem={handleDelete}
          title="Timesheets"
          addRedirectLink="/time-sheets/form"
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
      {deleteModalDisplay && (
        <Modal
          heading={`Do you want to delete this Timesheet?`}
          setModalDisplay={setDeleteModalDisplay}
          theme={'confirm'}
        >
          <p>This change can not be undone!</p>
          <div className={styles.buttons}>
            <Button
              label={'Cancel'}
              theme={'primary'}
              onClick={() => {
                setDeleteModalDisplay();
              }}
            />
            <Button
              label={'Delete'}
              theme={'tertiary'}
              onClick={() => {
                deleteItem();
                setDeleteModalDisplay(false);
              }}
            />
          </div>
        </Modal>
      )}
      {successModalDisplay && (
        <Modal
          heading={'Timesheet deleted successfully!'}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      )}
      {errorModalDisplay && (
        <Modal
          heading={`Could not delete Timesheet!`}
          setModalDisplay={setErrorModalDisplay}
          theme={'error'}
        />
      )}
    </section>
  );
};

export default List;
