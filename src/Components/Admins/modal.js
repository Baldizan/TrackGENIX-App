import React from 'react';
import styles from './modal.module.css';

const Modal = ({
  content,
  contentMessage,
  heading,
  setModalDisplay,
  confirmButton,
  cancelButton,
  reqFunction
}) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <button className={styles.top__close__button} onClick={() => setModalDisplay(false)}>
          X
        </button>
      </header>
      <div>
        {content ?? null}
        {contentMessage ? <p className={styles.content}>{contentMessage}</p> : null}
        <button className={styles.bottom__close__button} onClick={() => setModalDisplay(false)}>
          {cancelButton}
        </button>
        <button className={styles.confirm__button} onClick={reqFunction}>
          {confirmButton}
        </button>
      </div>
    </div>
  );
};

export default Modal;
