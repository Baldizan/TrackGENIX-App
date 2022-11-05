import styles from './modal.module.css';

const ModalDelete = ({ modal, setModal, deleteSuperAdmin, fedbackTitle }) => {
  return (
    <>
      {modal && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h1>Are you sure?</h1>
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
              <h2>{fedbackTitle}</h2>
              <h3>This process cannot be undone.</h3>
              <button
                onClick={() => {
                  deleteSuperAdmin();
                  alert('Super Admin deleted successfully');
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

export default ModalDelete;
