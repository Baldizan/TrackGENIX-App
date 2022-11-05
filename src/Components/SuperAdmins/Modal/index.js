import styles from './modal.module.css';

const ModalWarning = ({ modal, setModal, deleteSuperAdmin, fedbackTitle }) => {
  return (
    <>
      {modal && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>Titulo</h3>
            </div>
            <button
              onClick={() => {
                setModal(false);
              }}
              className={styles.btnClose}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/icon-close.svg`} />
            </button>
            <div className={styles.modalBody}>
              <h3>{fedbackTitle}</h3>
              <p>This process cannot be undone</p>
              <button
                onClick={() => {
                  deleteSuperAdmin();
                  alert('SuperAdmins deleted successfully');
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWarning;
