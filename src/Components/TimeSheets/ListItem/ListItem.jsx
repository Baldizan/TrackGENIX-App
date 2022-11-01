import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './ListItem.css';

const ListItem = ({ listItem, deleteItem }) => {
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    setModal(!modal);
  };

  const handleConfirmDelete = () => {
    deleteItem(listItem._id);
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(!modal);
  };

  return (
    <>
      <tr className="space-between tr">
        <td>{listItem.project?.name}</td>
        <td>{listItem.task?.description}</td>
        <td>{listItem.employee?.name}</td>
        <td>{listItem.description}</td>
        <td>{new Date(listItem.date).toLocaleDateString()}</td>
        <td>{listItem.hours}</td>
        <div>
          <button className="btn-delete" onClick={handleDelete}>
            X
          </button>
        </div>
      </tr>
      {modal && <Modal text="Are you sure?" confirm={handleConfirmDelete} close={handleClose} />}
    </>
  );
};

export default ListItem;
