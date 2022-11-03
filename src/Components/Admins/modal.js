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
      <div>
        {content ?? null}
        {contentMessage && !content ? (
          <div>
            <p className={styles.content}>{contentMessage}</p>
            <button
              type="submit"
              className={styles.confirm__button}
              onClick={() => {
                reqFunction();
              }}
            >
              Confirm
            </button>
          </div>
        ) : null}
        <button className={styles.bottom__close__button} onClick={() => setModalDisplay()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
