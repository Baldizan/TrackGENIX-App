import React from 'react';
import './Modal.css';

const Modal = ({ text, confirm }) => {
  //const [modal, setModal] = useState(false);

  const handleConfirm = () => {
    //setModal(!modal);
    confirm();
  };

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <button>X</button>
          <span>{text}</span>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
