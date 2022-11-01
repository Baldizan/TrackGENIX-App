import styles from './modalAlert.module.css';

const ModalAlert = ({ modalAlert, setModalAlert, message, titleModal }) => {
  return (
    <>
      {modalAlert && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h1>{titleModal}</h1>
            </div>
            <button
              onClick={() => {
                setModalAlert(false);
              }}
              className={styles.btnClose}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/icon-close.svg`} />
            </button>
            <div className={styles.modalBody}>
              <h2>{message}</h2>
              <button
                onClick={() => {
                  location.replace('http://localhost:3000/super-admins');
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalAlert;
