import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal/index';
import Table from '../Shared/Table/index';
import styles from './projects.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from '../../redux/Projects/thunks';

const Projects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: projectsList, isPending, error } = useSelector((state) => state.projects);
  const [modal, setModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [projectEmployees, setProjectEmployees] = useState([]);
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

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleEdit = (item) => {
    history.push('/projects/form', { id: item._id });
  };

  const handleDelete = (item) => {
    dispatch(deleteProject(item._id));
    setModal(false);
    dispatch(getProjects());
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

  const projectColumns = projectsList.map((row) => ({
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
      {isPending && <p>Loading...</p>}
      {error && <p>Error</p>}
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
          <Button
            label="Delete"
            theme="tertiary"
            onClick={() => {
              handleDelete();
              setModal(false);
            }}
          />
        </Modal>
      )}
      {!isPending && !error ? (
        <Table
          data={projectColumns}
          headers={headers}
          title="Projects"
          addRedirectLink="projects/form"
          editItem={handleEdit}
          deleteItem={handleDelete}
          itemsPerPage={5}
        />
      ) : null}
    </section>
  );
};

export default Projects;
