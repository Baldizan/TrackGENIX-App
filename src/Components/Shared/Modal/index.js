import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ content, contentMessage, heading, setModalDisplay, reqFunction, theme }) => {
  return (
    <div className={styles.container}>
      <div className={styles[theme]}>
        <header className={styles.header}>
          <h2>{heading}</h2>
          <button className={styles.topCloseButton} onClick={() => setModalDisplay()}>
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
                label={'Delete'}
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
