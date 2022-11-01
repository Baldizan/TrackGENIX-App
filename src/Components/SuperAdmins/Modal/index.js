import styles from './modal.module.css';

const ModalWarning = ({ modal, setModal, deleteSuperAdmin, message, titleModal }) => {
  return (
    <>
      {modal && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>{titleModal}</h3>
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
              <p>{message}</p>
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

export default ModalWarning;
