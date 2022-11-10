import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal/index';
import Table from '../Shared/Table/index';
import styles from './projects.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../Shared/Button';

function Projects() {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectDelete, setProjectDelete] = useState();
  const headers = [
    'name',
    'description',
    'startDate',
    'endDate',
    'clientName',
    'active',
    'employees'
  ];

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

  const addProject = () => {
    history.push('/projects/form');
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
      alert(`Assigned employees to project ${name}:\n` + text.join('\n'));
    }
  };

  return (
    <section className={styles.container}>
      {modal && (
        <Modal
          setModalDisplay={setModal}
          heading={'Do you want delete this project'}
          theme={'confirm'}
        >
          <div>
            <Button label={'Cancel'} theme={'primary'} onClick={handleCloseModal} />
            <Button label={'Delete'} theme={'tertiary'} onClick={confirmDelete} />
          </div>
        </Modal>
      )}
      <h2 className={styles.title}>Projects</h2>
      <Button label={'Add new project'} theme={'primary'} onClick={addProject} />
      <Table
        data={projects.map((row) => ({
          ...row,
          employees: (
            <Button
              label={'See employees'}
              theme={'primary'}
              onClick={() => showEmployees(row.employees, row.name)}
            />
          )
        }))}
        headers={headers}
        editItem={handleEdit}
        deleteItem={handleDelete}
      />
    </section>
  );
}

export default Projects;
