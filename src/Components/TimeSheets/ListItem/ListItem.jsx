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

  const handleEdit = () => {
    window.location.href = `/time-sheets/form?id=${listItem._id}`;
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
          <button onClick={handleEdit}>Edit</button>
        </div>
      </tr>
      {modal && (
        <Modal
          text="That you want to delete this timesheet?"
          confirm={handleConfirmDelete}
          close={handleClose}
        />
      )}
    </>
  );
};

export default ListItem;
