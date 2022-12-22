import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/Projects/thunks';
import { fetchUser } from 'redux/Auth/thunks';
import styles from './projects.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const role = sessionStorage.getItem('role');
  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const isProjectManager = sessionStorage.getItem('isProjectManager');
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const headers = {
    name: 'Project Name',
    role: 'Role',
    startDate: 'Start Date',
    endDate: 'End Date'
  };

  useEffect(async () => {
    if (!user._id) {
      dispatch(fetchUser(role, email, token));
    }
    if (user._id) {
      dispatch(getProjects(token, 'projectManager', user._id));
      if (projectsList.length) {
        sessionStorage.setItem('isProjectManager', true);
      }
      dispatch(getProjects(token, 'employees.id', user._id));
    }
  }, []);

  const projectsDataEmployee = () => {
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
        <Table
          headers={headers}
          data={projectsDataEmployee()}
          title="My projects"
          itemsPerPage={5}
          isSearchEnabled={true}
          redirectLink={isProjectManager && '/employee/projects/management'}
          redirectLabel="Manage Projects"
        />
      )}
    </section>
  );
};

export default EmployeeProjects;
