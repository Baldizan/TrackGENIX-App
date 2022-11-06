import React from 'react';
import styles from './modal.modules.css';

const Modal = ({ content, contentMessage, heading, setModalDisplay, reqFunction }) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <button className={styles.topclosebutton} onClick={() => setModalDisplay()}>
          X
        </button>
      </header>
      <div className={styles.content}>
        {content ?? null}
        {contentMessage && !content ? <p className={styles.content}>{contentMessage}</p> : null}
        {contentMessage && !content ? (
          <div>
            <button
              type="submit"
              className={styles.confirmbutton}
              onClick={() => {
                reqFunction();
              }}
            >
              Confirm
            </button>
            <button className={styles.bottomclose__button} onClick={() => setModalDisplay()}>
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
