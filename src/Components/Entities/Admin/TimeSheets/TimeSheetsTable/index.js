import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets, deleteTimeSheet } from 'redux/TimeSheets/thunks';
import styles from './List.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const List = () => {
  const { list: timesheetList, isPending, error } = useSelector((state) => state.timesheets);
  const [isModal, setIsModal] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ heading: '', message: '', theme: '' });
  const [selectedTimesheet, setSelectedTimesheet] = useState({});
  const token = sessionStorage.getItem('token');
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

  const timesheetsColumns = timesheetList?.map((row) => ({
    ...row,
    date: row.date.slice(0, 10),
    project: row.project?._id,
    task: row.task?._id,
    employee: row.employee?._id,
    projectName: row.project?.name ?? 'N/A',
    taskDescription: row.task?.description ?? 'N/A',
    employeeFormat: row.employee ? `${row.employee?.name} ${row.employee?.lastName}` : 'N/A'
  }));

  useEffect(() => {
    dispatch(getTimeSheets(token));
  }, []);

  const handleDelete = (item) => {
    setSelectedTimesheet(item);
    setIsModal(true);
  };

  const deleteItem = () => {
    if (selectedTimesheet) {
      dispatch(deleteTimeSheet(selectedTimesheet._id, token));
      if (!error) {
        setModalContent({
          heading: 'Success!',
          message: 'Time sheet successfully deleted',
          theme: 'success'
        });
        setIsFeedbackModal(true);
      } else {
        setModalContent({
          heading: 'There was an error!',
          message: `The time sheet could not be deleted. Status: ${error.status} ${error.statusText}`,
          theme: 'error'
        });
        setIsFeedbackModal(true);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedTimesheet(item);
    history.push(`/admin/time-sheets/form`, {
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
          data={timesheetsColumns}
          editItem={handleEdit}
          deleteItem={handleDelete}
          title="Timesheets"
          redirectLink="/admin/time-sheets/form"
          itemsPerPage={5}
          isSearchEnabled
        />
      )}
      {!isPending && isModal && (
        <Modal
          heading="Confirmation required!"
          message="Are you sure you want to delete this Timesheet?"
          setModalDisplay={setIsModal}
          theme="confirm"
          confirmFunction={deleteItem}
        />
      )}
      {isFeedbackModal && (
        <Modal
          heading={modalContent.heading}
          message={modalContent.message}
          setModalDisplay={setIsFeedbackModal}
          theme={modalContent.theme}
        />
      )}
    </section>
  );
};

export default List;
