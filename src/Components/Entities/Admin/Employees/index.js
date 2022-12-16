import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from 'redux/Employees/thunks.js';
import styles from './employees.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader/index.js';
import Error from 'Components/Shared/Error/index.js';

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: employeesList, isPending, error } = useSelector((state) => state.employees);
  const token = sessionStorage.getItem('token');
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    project: 'Project',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  const employeesColumns = employeesList?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    project: row.project?.name ?? 'N/A'
  }));

  const handleEdit = (item) => {
    history.push('/employees/form', { ...item, project: item.project?._id });
  };

  return (
    <section className={styles.container}>
      {!isPending && !error && (
        <Table
          data={employeesColumns}
          headers={headers}
          editItem={handleEdit}
          title="Employees"
          itemsPerPage={5}
        />
      )}
      {isPending && <Loader />}
      {error && <Error text={error} />}
    </section>
  );
};

export default Employees;
