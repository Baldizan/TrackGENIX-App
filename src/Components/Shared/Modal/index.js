import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ heading, children, setModalDisplay, theme }) => {
  let closeTheme;

  if (theme === 'error') {
    closeTheme = 'white';
  } else {
    closeTheme = 'purple';
  }
  return (
    <div className={styles.container}>
      <div className={styles[theme]}>
        <div className={styles.header}>
          <h2 className={styles.title}>{heading}</h2>
          <Button
            className={styles.topCloseButton}
            onClick={() => setModalDisplay()}
            icon={`${process.env.PUBLIC_URL}/assets/images/close-cross-${closeTheme}.svg`}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
