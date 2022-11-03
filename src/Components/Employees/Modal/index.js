import styles from './modal.module.css';

const Modal = (props) => {
  const { show, handleModal, deleteEmployee, employee } = props;
  const closeModal = () => handleModal(false);
  const confirmDelete = () => {
    deleteEmployee(employee.id);
    closeModal();
    window.location.reload();
    alert('Employee deleted');
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Message from Trackgenix</h3>
        <p>Are you sure you want to remove this employee: {employee.name}?</p>
        <button onClick={() => confirmDelete()} className={styles.confirm}>
          Confirm
        </button>
        <button onClick={() => closeModal()} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
