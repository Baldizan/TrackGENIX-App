import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/Projects/thunks';
// import { fetchUser } from 'redux/Auth/thunks';
import styles from './projects.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth.authenticated);
  const token = sessionStorage.getItem('token');
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const headers = {
    name: 'Project Name',
    startDate: 'Start Date',
    endDate: 'End Date'
  };

  useEffect(() => {
    if (token) {
      dispatch(getProjects(token));
    }
  }, []);

  const projectsData = () => {
    // const employeeProjects = projectsList.filter((project) => {
    //   return project.find((employees) => employees.id.email === email);
    // });
    let employeeProjects = [];
    for (let i = 0; i < projectsList?.length; i++) {
      for (let j = 0; j < projectsList[i].employees.length; j++) {
        if (projectsList[i].employees[j]?.id.email === email) {
          projectsList[i].startDate = projectsList[i].startDate.slice(0, 10);
          projectsList[i].endDate = projectsList[i].endDate.slice(0, 10);
          employeeProjects.push(projectsList[i]);
        }
      }
    }
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
