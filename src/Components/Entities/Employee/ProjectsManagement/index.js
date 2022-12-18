import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/Projects/thunks';
import { fetchUser } from 'redux/Auth/thunks';
import styles from './projects.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [modalEmployee, setModalEmployee] = useState(false);
  const headers = {
    name: 'Project Name',
    clientName: 'Client',
    startDate: 'Start Date',
    endDate: 'End Date',
    employeesButton: 'Employees',
    rate: 'Total Rate',
    status: 'Status'
  };

  useEffect(async () => {
    if (!user._id) {
      dispatch(fetchUser(role, email, token));
    }
    if (user._id) {
      dispatch(getProjects(token, 'projectManager', user._id));
    }
  }, []);

  const handleEdit = (item) => {
    history.push('/employee/projects/management/form', {
      id: item._id,
      project: {
        ...item,
        employeesButton: '',
        employees: item.employees?.map((e) => ({
          employeeId: e.id?._id,
          role: e.role,
          rate: e.rate
        }))
      }
    });
  };

  const projectsData = projectsList.map((project) => ({
    ...project,
    startDate: project.startDate?.slice(0, 10),
    endDate: project.endDate?.slice(0, 10),
    employeesButton: (
      <Button
        label="See employees"
        theme="primary"
        onClick={() => showEmployees(project.employees.filter((employee) => employee.id !== null))}
      />
    ),
    rate: projectsList.reduce((sum, current, index) => {
      return sum + current.employees[index].rate;
    }, 0),
    status: project.active ? 'Active' : 'Inactive'
  }));

  const showEmployees = (employees) => {
    if (employees) {
      const projectEmployees = employees.map((employee) => ({
        name: employee.id.name + ' ' + employee.id.lastName,
        role: employee.role,
        rate: employee.rate
      }));
      setProjectEmployees(projectEmployees);
      setModalEmployee(true);
    }
  };

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
          editItem={handleEdit}
        />
      )}
      {modalEmployee && (
        <Modal setModalDisplay={setModalEmployee} heading="Project Employees">
          <div className={styles.employeesTableContainer}>
            <Table
              data={projectEmployees}
              headers={{ name: 'Employee', role: 'Role', rate: 'Rate' }}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default EmployeeProjects;
