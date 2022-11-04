import React from 'react';
import './Modal.css';

const Modal = ({ text, confirm = false, close = false }) => {
  return (
    <>
      <div className="overlay">
        <div className="modal column">
          <button className="btn-close" onClick={close}>
            X
          </button>
          <span className="text-modal">{text}</span>
          <button className="btn-confirm" onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
