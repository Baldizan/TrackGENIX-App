import React from 'react';
import './Modal.css';

const Modal = ({ text, confirm, close }) => {
  const handleConfirm = () => {
    confirm();
  };

  const handleClose = () => {
    close();
  };

  return (
    <>
      <div className="overlay">
        <div className="modal column">
          <button className="btn-close" onClick={handleClose}>
            X
          </button>
          <span className="text-modal">{text}</span>
          <button className="btn-confirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
