import { useEffect, useState } from 'react';
import Modal from './Modal/modal.js';
import styles from './projects.module.css';

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelection] = useState({});
  const [projects, saveProjects] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => saveProjects(response.data));
  }, []);

  const newProject = () => {
    // abrir modal
    // lleno el modal
    // leo datos del modal
    // hago elemento pepito
    // POST pepito
    // GET ALL
    // saveProjects(respuesta GET ALL)
  };

  // const deleteModal = (idToDelete, nameToDelete) => {
  //   <div className={styles.deleteModal}>
  //     <p>Do you want to delete project ${nameToDelete}?</p>
  //     <button
  //       className={styles.button}
  //       onClick={() => {
  //         deleteProject(idToDelete, nameToDelete);
  //       }}
  //     >
  //       Delete
  //     </button>
  //     <button
  //       className={styles.button}
  //       onClick={() => {
  //         alert('hola');
  //       }}
  //     >
  //       Cancel
  //     </button>
  //   </div>;
  // };

  const deleteProject = (projectToDeleteId) => {
    if (confirm('Delete project')) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectToDeleteId}`, {
        method: 'DELETE'
      });
      const projectsDeleted = projects.filter((project) => project._id !== projectToDeleteId);
      saveProjects(projectsDeleted);
    }
  };

  function handleDelete(project) {
    setSelection({ id: project._id });
    setShowModal(true);
  }

  const editProject = (projectToEdit) => {
    alert(`Aca se tiene que editar el proyecto ${projectToEdit}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteProject={deleteProject}
        project={selectedProject}
      />
      <h2 className={styles.title}>Projects</h2>
      <button
        className={styles.button}
        onClick={() => {
          newProject();
        }}
      >
        Add New Project
      </button>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableCell}>Name</th>
            <th className={styles.tableCell}>Employees</th>
            <th className={styles.tableCell}>Start Date</th>
            <th className={styles.tableCell}>End Date</th>
            <th className={styles.tableCell}>Status</th>
            <th className={styles.tableCell}>Client</th>
            <th className={styles.emptyTableCell}></th>
            <th className={styles.emptyTableCell}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {projects.map((project) => {
            return (
              <tr className={styles.row} key={project._id}>
                <td className={styles.tableCell}>{project.name}</td>
                <td className={styles.tableCell}>
                  <button className={styles.button}>See employees</button>
                </td>
                <td className={styles.tableCell}>{project.startDate.slice(0, 10)}</td>
                <td className={styles.tableCell}>{project.endDate.slice(0, 10)}</td>
                <td className={styles.tableCell}>{project.status}</td>
                <td className={styles.tableCell}>{project.clientName}</td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.deleteEditButton}
                    onClick={() => {
                      // deleteProject(project._id, project.name);
                      handleDelete(project._id);
                    }}
                  >
                    <img
                      className={styles.deleteEditIcon}
                      src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                    />
                  </button>
                </td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.deleteEditButton}
                    onClick={() => {
                      editProject(project._id);
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
