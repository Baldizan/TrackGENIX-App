import styles from './modal.module.css';

const Modal = (props) => {
  const { show, closeModal, deleteProject, project } = props;
  const cerrarModal = () => closeModal(false);
  const confirmDelete = () => {
    deleteProject(project.id);
    cerrarModal();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>Delete project?</h2>
        <p>Are you sure you want to delete project?</p>
        <button className={styles.closeButton} onClick={cerrarModal()}>
          Close
        </button>
        <button className={styles.deleteButton} onClick={confirmDelete()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
