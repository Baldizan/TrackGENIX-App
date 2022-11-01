import styles from './modal.module.css';

function Modal(props) {
  const { show, closeModal, deleteFunction, projectToBeDeleted } = props;
  const confirmDelete = () => {
    deleteFunction(projectToBeDeleted);
    closeModal();
  };
  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>Delete project?</h2>
        <p>Are you sure you want to delete project {projectToBeDeleted.name}?</p>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
        <button className={styles.deleteButton} onClick={() => confirmDelete()}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Modal;
