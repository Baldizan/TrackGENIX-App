import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ text, confirm = false, close = false }) => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={[styles.modal, styles.column]}>
          <button className={styles.close} onClick={close}>
            X
          </button>
          <span className={styles.textModal}>{text}</span>
          <button className={styles.btnConfirm} onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
