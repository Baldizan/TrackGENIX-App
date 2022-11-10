import React, { useEffect, useState } from 'react';
import Modal from './Modal/modal.js';
import Table from '../Shared/Table/index';
import styles from './projects.module.css';
import { useHistory } from 'react-router-dom';

function Projects() {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const headers = [
    'aaa',
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
      .then((response) => response.json())
      .then((response) => setProjects(response.data || []));
  }, []);

  const addProject = () => {
    history.push('/projects/form');
  };

  // const deleteProject = (selectedProject) => {
  //   fetch(`${process.env.REACT_APP_API_URL}/projects/${selectedProject.id}`, {
  //     method: 'DELETE'
  //   });
  //   const projectsDeleted = projects.filter((project) => project._id !== selectedProject.id);
  //   setProjects(projectsDeleted);
  //   alert(`Project ${selectedProject.name} deleted successfully!`);
  // };

  const handleDelete = () => {
    setModal(true);

    //setProjects(projectsDeleted);
    //alert(`Project ${selectedProject.name} deleted successfully!`);
    //setSelectedProject({ id: project._id, name: project.name });
  };

  const closeModal = () => {
    setModal(false);
  };

  const showEmployees = (employees, name) => {
    if (employees) {
      let text = [];
      employees.forEach((employee) => {
        text.push(employee.id.name + employee.role + employee.rate);
        console.log('hola', employee.id.name);
      });
      alert(`Assigned employees to project ${name}:\n` + text.join('\n'));
    }
  };

  const handleEdit = (item) => {
    history.push('/projects/form', { id: item._id });
  };

  const confirmDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    projects.filter((project) => project._id !== id);
  };

  console.log(projects);
  return (
    <section className={styles.container}>
      <Modal
        show={modal}
        closeModal={closeModal}
        deleteFunction={confirmDelete}
        //projectToBeDeleted={selectedProject}
      />
      <h2 className={styles.title}>Projects</h2>
      <button
        className={styles.button}
        onClick={() => {
          addProject();
        }}
      >
        Add New Project
      </button>
      <Table
        data={projects.map((row) => ({
          ...row,
          aaa: row.employees ? row.employees.length : 0,
          employees: (
            <button
              className={styles.button}
              onClick={() => showEmployees(row.employees, row.name)}
            >
              See employees
            </button>
          )
        }))}
        headers={headers}
        editItem={handleEdit}
        deleteItem={handleDelete}
      />
      {/* <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Project name</th>
            <th className={styles.tableDescription}>Project description</th>
            <th>Employees</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Client</th>
            <th>Status</th>
            <th className={styles.emptyTableCell}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {projects.map((project) => {
            return (
              <tr className={styles.row} key={project._id}>
                <td>{project.name}</td>
                <td className={styles.tableDescription}>{project.description}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => showEmployees(project.employees, project.name)}
                  >
                    See employees
                  </button>
                </td>
                <td>{project.startDate.slice(0, 10)}</td>
                <td>{project.endDate.slice(0, 10)}</td>
                <td>{project.clientName}</td>
                <td>{project.status}</td>
                <td>
                  <button
                    className={styles.deleteEditButton}
                    onClick={() => {
                      handleDelete(project);
                    }}
                  >
                    <img
                      className={styles.deleteEditIcon}
                      src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                    />
                  </button>
                  <button
                    className={styles.deleteEditButton}
                    onClick={() => {
                      addProject(project._id);
                    }}
                  >
                    <img
                      className={styles.deleteEditIcon}
                      src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </section>
  );
}

export default Projects;
