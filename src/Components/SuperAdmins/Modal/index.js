import styles from './modal.module.css';

const ModalDelete = ({ modal, setModal, deleteSuperAdmin }) => {
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
              <h2>Do you really want to delete Super Admin.</h2>
              <h3>This process cannot be undone.</h3>
              <button
                onClick={() => {
                  deleteSuperAdmin();
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