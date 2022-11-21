import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from 'redux/TimeSheets/thunks';
import styles from './timesheets.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeTimesheets = () => {
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const { list: timesheetList, isPending, error } = useSelector((state) => state.timesheets);
  const dispatch = useDispatch();
  const history = useHistory();
  const headers = {
    projectName: 'Project Name',
    taskDescription: 'Task Description',
    description: 'Description',
    hours: 'Hours'
  };
  const mockedEmployeeLogged = '636e639dfb8b4c835d213750';
  const timeSheetData = () => {
    return timesheetList
      .map((row) => {
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
      })
      .filter((t) => t.employee === mockedEmployeeLogged);
  };

  useEffect(() => {
    dispatch(getTimeSheets());
  }, []);

  const handleEdit = (item) => {
    history.push(`/employee/time-sheets/form`, item);
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
          title="My timesheets"
          addRedirectLink="/employee/time-sheets/form"
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
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

export default EmployeeTimesheets;
