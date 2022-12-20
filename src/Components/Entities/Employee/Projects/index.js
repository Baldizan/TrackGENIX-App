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

  const projectsData = projectsList.map((project) => ({
    name: project.name,
    startDate: project.startDate.slice(0, 10),
    endDate: project.endDate.slice(0, 10),
    role: project.employees.map((e) => e.role)
  }));

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={projectsData}
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
