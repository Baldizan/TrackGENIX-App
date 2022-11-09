import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ heading, children, setModalDisplay, theme }) => {
  return (
    <div className={styles.container}>
      <div className={styles[theme]}>
        <div className={styles.header}>
          <h2 className={styles.title}>{heading}</h2>
          <Button
            className={styles.topCloseButton}
            onClick={() => setModalDisplay()}
            icon={`${process.env.PUBLIC_URL}/assets/images/close-cross.svg`}
          />
        </div>
        {children ? <div className={styles.content}>{children}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
