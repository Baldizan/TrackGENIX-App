import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/Projects/thunks';
import styles from './projects.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.authenticated.email);
  const token = sessionStorage.getItem('token');
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const headers = {
    name: 'Project Name',
    role: 'Role',
    startDate: 'Start Date',
    endDate: 'End Date'
  };

  useEffect(() => {
    if (token) {
      dispatch(getProjects(token));
    }
  }, []);

  const projectsData = () => {
    const employeeProjects = projectsList.filter((project) => {
      return project.employees.find((e) => e.id?.email === email);
    });
    employeeProjects.map((project) => {
      project.startDate = project.startDate.slice(0, 10);
      project.endDate = project.endDate.slice(0, 10);
      project.role = project.employees.find((e) => e.id?.email === email).role;
    });
    return employeeProjects;
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Table headers={headers} data={projectsData()} title="My projects" itemsPerPage={5} />
      )}
    </section>
  );
};

export default EmployeeProjects;
