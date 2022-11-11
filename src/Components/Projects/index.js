import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal/index';
import Table from '../Shared/Table/index';
import styles from './projects.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../Shared/Button';

function Projects() {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [textEmployee, setTextEmployee] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectDelete, setProjectDelete] = useState();
  const headers = {
    name: 'Name',
    description: 'Description',
    startDate: 'Start date',
    endDate: 'End date',
    clientName: 'Client name',
    active: 'Status',
    employees: 'Employees'
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((res) => setProjects(res.data || []));
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
      setProjects(projects.filter((project) => project._id !== projectDelete._id));
    });
  };

  const showEmployees = (employees, name) => {
    if (employees) {
      let text = [];
      employees.forEach((employee) => {
        text.push(employee.id.name + ' ' + employee.role + ' ' + employee.rate);
      });
      setModalEmployee(true);
      setTextEmployee(`Assigned employees to project ${name}` + text.join('\n'));
    } else {
      setTextEmployee('no');
    }
  };

  const projectColumns = projects.map((row) => ({
    ...row,
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
          {textEmployee}
        </Modal>
      )}
      {modal && (
        <Modal setModalDisplay={setModal} heading="Do you want delete this project" theme="confirm">
          <div className={styles.btnContainer}>
            <Button label="Cancel" theme="primary" onClick={handleCloseModal} />
            <Button label="Delete" theme="tertiary" onClick={confirmDelete} />
          </div>
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
}

export default Projects;
