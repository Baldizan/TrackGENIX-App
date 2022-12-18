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
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const headers = {
    name: 'Project Name',
    clientName: 'Client',
    startDate: 'Start Date',
    endDate: 'End Date',
    employees: 'Employees'
  };

  useEffect(async () => {
    if (!user._id) {
      dispatch(fetchUser(role, email, token));
    }
    if (user._id) {
      dispatch(getProjects(token, 'projectManager', user._id));
    }
  }, []);

  const projectsData = projectsList.map((project) => ({
    ...project,
    startDate: project.startDate?.slice(0, 10),
    endDate: project.endDate?.slice(0, 10),
    employees: project.employees?.length
  }));

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={projectsData}
          title="Project Management"
          itemsPerPage={5}
          isSearchEnabled={true}
          redirectLink="/employee/projects"
          redirectLabel="Back to My Projects"
          editItem={true}
        />
      )}
    </section>
  );
};

export default EmployeeProjects;
