import React, { useEffect, useState } from 'react';
import Modal from './Modal/modal.js';
import styles from './projects.module.css';

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [projects, saveProjects] = useState([]);
  const [selectedProject, setSelection] = useState({});
  // eslint-disable-next-line
  // const [employees, saveEmployees] = useState([]);
  const [assignedEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((response) => response.json())
      .then((response) => saveProjects(response.data || []));
    // fetch(`${process.env.REACT_APP_API_URL}employees`)
    //   .then((response) => response.json())
    //   .then((response) => saveEmployees(response.data || []));
  }, []);

  const newEditProject = (id) => {
    if (id) {
      window.location.assign(`/projects/form?id=${id}`);
    } else {
      window.location.assign('/projects/form');
    }
  };

  const deleteProject = (projectToDelete) => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${projectToDelete.id}`, {
      method: 'DELETE'
    });
    const projectsDeleted = projects.filter((project) => project._id !== projectToDelete.id);
    saveProjects(projectsDeleted);
    alert(`Project ${projectToDelete.name} deleted successfully!`);
  };

  const handleDelete = (project) => {
    setShowModal(true);
    setSelection({ id: project._id, name: project.name });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showEmployees = (employees, name) => {
    assignedEmployees.splice(0, assignedEmployees.length);
    for (let i = 0; i < employees.length; i++) {
      assignedEmployees.push(
        `${employees[i].id.name} ${employees[i].id.lastName} ${employees[i].role} ${employees[i].rate}`
      );
    }
    alert(`Assigned employees to project ${name}:\n` + assignedEmployees.join('\n'));
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteFunction={deleteProject}
        projectToBeDeleted={selectedProject}
      />
      <h2 className={styles.title}>Projects</h2>
      <button
        className={styles.button}
        onClick={() => {
          newEditProject();
        }}
      >
        Add New Project
      </button>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableCell}>Project name</th>
            <th className={styles.tableDescription}>Project description</th>
            <th className={styles.tableCell}>Employees</th>
            <th className={styles.tableCell}>Start Date</th>
            <th className={styles.tableCell}>End Date</th>
            <th className={styles.tableCell}>Client</th>
            <th className={styles.tableCell}>Status</th>
            <th className={styles.emptyTableCell}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {projects.map((project) => {
            return (
              <tr className={styles.row} key={project._id}>
                <td className={styles.tableCell}>{project.name}</td>
                <td className={styles.tableDescription}>{project.description}</td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.button}
                    onClick={() => showEmployees(project.employees, project.name)}
                  >
                    See employees
                  </button>
                </td>
                <td className={styles.tableCell}>{project.startDate.slice(0, 10)}</td>
                <td className={styles.tableCell}>{project.endDate.slice(0, 10)}</td>
                <td className={styles.tableCell}>{project.clientName}</td>
                <td className={styles.tableCell}>{project.status}</td>
                <td className={styles.tableCell}>
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
                      newEditProject(project._id);
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
      </table>
    </section>
  );
}

export default Projects;
