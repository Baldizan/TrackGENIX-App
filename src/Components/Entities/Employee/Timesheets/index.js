import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from 'redux/TimeSheets/thunks';
import styles from './timesheets.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeTimesheets = () => {
  const { list: timesheetList, isPending, error } = useSelector((state) => state.timesheets);
  const token = sessionStorage.getItem('token');
  const { data } = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const headers = {
    projectName: 'Project Name',
    taskDescription: 'Task Description',
    description: 'Description',
    hours: 'Hours'
  };

  const timeSheetData = () => {
    if (timesheetList) {
      timesheetList
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
        .filter((t) => t.employee === data?._id);
    }
  };

  useEffect(() => {
    dispatch(getTimeSheets(token));
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
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default EmployeeTimesheets;
