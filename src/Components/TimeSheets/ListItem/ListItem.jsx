import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './ListItem.css';

const ListItem = ({ listItem, deleteItem }) => {
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    setModal(!modal);
  };

  const handleConfirm = () => {
    deleteItem(listItem._id);
    setModal(!modal);
  };

  return (
    <>
      <tr className="space-between">
        <td>{listItem.project.name}</td>
        <td>{listItem.task.description}</td>
        <td>{listItem.description}</td>
        <td>{listItem.employee}</td>
        <td>{new Date(listItem.date).toLocaleDateString()}</td>
        <td>{listItem.hours}</td>
        <div>
          <button onClick={handleDelete}>X</button>
        </div>
      </tr>

      {modal && <Modal text="Are you sure?" confirm={handleConfirm} />}
    </>
  );
};

export default ListItem;
