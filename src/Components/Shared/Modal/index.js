import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ content, contentMessage, heading, setModalDisplay, reqFunction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <button className={styles.topCloseButton} onClick={() => setModalDisplay(false)}>
            X
          </button>
        </header>
        <div className={styles.content}>
          {content ?? null}
          {contentMessage && !content ? <p className={styles.content}>{contentMessage}</p> : null}
          {contentMessage && !content ? (
            <div className={styles.buttons}>
              <Button
                label={'Cancel'}
                theme={'primary'}
                type="submit"
                onClick={() => {
                  reqFunction();
                }}
              />
              <Button
                label={'Confirm'}
                theme={'tertiary'}
                type="submit"
                onClick={() => {
                  reqFunction();
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
