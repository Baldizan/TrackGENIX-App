import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ heading, children, setModalDisplay, theme, message, confirmFunction }) => {
  return (
    <dialog className={`${styles.container} ${styles[theme]}`}>
      <header className={theme === 'success' ? styles.headerSuccess : styles.header}>
        <h2 className={styles.title}>{heading}</h2>
        <Button
          className={styles.topCloseButton}
          onClick={() => setModalDisplay()}
          icon={`${process.env.PUBLIC_URL}/assets/images/close-cross.svg`}
        />
      </header>
      {children ? <div className={styles.content}>{children}</div> : null}
      {message ? <p className={styles.message}>{message}</p> : null}
      {!children && (
        <div className={styles.buttonsContainer}>
          <Button
            label={theme === 'confirm' ? 'Cancel' : 'Close'}
            theme={theme === 'confirm' ? 'primary' : 'tertiary'}
            onClick={() => {
              setModalDisplay();
            }}
          />
          {theme === 'confirm' ? (
            <Button
              label="Confirm"
              theme="secondary"
              onClick={() => {
                {
                  confirmFunction;
                }
                setModalDisplay(false);
              }}
            />
          ) : null}
        </div>
      )}
    </dialog>
  );
};

export default Modal;
