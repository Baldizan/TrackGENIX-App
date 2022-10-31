import React from 'react';
import './Modal.css';
const Modal = () => {
    return (
        <>
            <div className="overlay">
                <modal className="modal">
                    <ModalContentDelete></ModalContentDelete>
                </modal>
            </div>
        </>
    );
};

export default Modal;
