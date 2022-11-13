import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal/index';
import Table from '../Shared/Table/index';
import styles from './projects.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/Projects/thunks';

const Projects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: projects } = useSelector((state) => state.projects);
  const [modal, setModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [projectDelete, setProjectDelete] = useState();
  const headers = {
    name: 'Name',
    description: 'Description',
    startDateFormat: 'Start date',
    endDateFormat: 'End date',
    clientName: 'Client name',
    employees: 'Employees',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const handleDelete = (item) => {
    setModal(true);
    setProjectDelete(item);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleEdit = (item) => {
    history.push('/projects/form', { id: item._id });
  };

  const confirmDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${projectDelete._id}`, {
      method: 'DELETE'
    }).then(() => {
      setModal(false);
    });
  };

  const showEmployees = (employees) => {
    if (employees) {
      const projectEmployees = employees.map((employee) => ({
        _id: employee._id,
        role: employee.role,
        rate: employee.rate
      }));
      setProjectEmployees(projectEmployees);
      setModalEmployee(true);
    }
  };

  const projectColumns = projects.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    startDateFormat: row.startDate.slice(0, 10),
    endDateFormat: row.startDate.slice(0, 10),
    employees: (
      <Button
        label="See employees"
        theme="primary"
        onClick={() => showEmployees(row.employees, row.name)}
      />
    )
  }));

  return (
    <section className={styles.container}>
      {modalEmployee && (
        <Modal setModalDisplay={setModalEmployee} theme="confirm">
          <div className={styles.employeesTableContainer}>
            <Table
              data={projectEmployees}
              headers={{ _id: 'Employee ID', role: 'Role', rate: 'Rate' }}
              title="Project employees"
            />
          </div>
        </Modal>
      )}
      {modal && (
        <Modal
          setModalDisplay={setModal}
          heading="Are you sure you want to delete this project?"
          theme="confirm"
        >
          <Button label="Cancel" theme="primary" onClick={handleCloseModal} />
          <Button label="Delete" theme="tertiary" onClick={confirmDelete} />
        </Modal>
      )}
      <Table
        data={projectColumns}
        headers={headers}
        title="Projects"
        addRedirectLink="projects/form"
        editItem={handleEdit}
        deleteItem={handleDelete}
        itemsPerPage={5}
      />
    </section>
  );
};

export default Projects;
