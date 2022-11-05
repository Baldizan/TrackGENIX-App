import React from 'react';
import styles from './modal.module.css';

const Modal = ({ content, contentMessage, heading, setModalDisplay, reqFunction }) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <button className={styles.top__close__button} onClick={() => setModalDisplay()}>
          X
        </button>
      </header>
      <div className={styles.content}>
        {content ?? null}
        {contentMessage && !content ? <p className={styles.content}>{contentMessage}</p> : null}
        {contentMessage && !content ? (
          <button
            type="submit"
            className={styles.confirm__button}
            onClick={() => {
              reqFunction();
              alert('Employee deleted');
            }}
          >
            Confirm
          </button>
        ) : null}
        <button className={styles.bottom__close__button} onClick={() => setModalDisplay()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
