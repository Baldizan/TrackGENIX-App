import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ contentMessage, heading, setModalDisplay, reqFunction, theme }) => {
  let closeTheme;

  if (theme == 'error') {
    closeTheme = 'white';
  } else {
    closeTheme = 'purple';
  }
  return (
    <div className={styles.container}>
      <div className={styles[theme]}>
        <header className={styles.header}>
          <h2 className={styles.title}>{heading}</h2>
          <Button
            className={styles.topCloseButton}
            onClick={() => setModalDisplay()}
            icon={`${process.env.PUBLIC_URL}/assets/images/close-cross-${closeTheme}.svg`}
          />
        </header>
        <div className={styles.content}>
          {contentMessage ? <p className={styles.content}>{contentMessage}</p> : null}
          {contentMessage ? (
            <div className={styles.buttons}>
              <Button
                label={'Cancel'}
                theme={'primary'}
                type="submit"
                onClick={() => {
                  setModalDisplay();
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
