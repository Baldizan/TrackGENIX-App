import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ListItem.module.css';
import { useHistory } from 'react-router-dom';

const ListItem = ({ listItem, deleteItem }) => {
  const [modal, setModal] = useState(false);
  let history = useHistory();

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
    history.push(`/time-sheets/form`, { id: listItem._id });
  };

  return (
    <>
      <tr>
        <td className={styles.td}>{listItem.project?.name}</td>
        <td className={styles.td}>{listItem.task?.description}</td>
        <td className={styles.td}> {listItem.employee?.name}</td>
        <td className={styles.td}>{listItem.description}</td>
        <td className={styles.td}>
          {new Date(listItem.date).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
        </td>
        <td className={styles.td}>{listItem.hours}</td>
        <div>
          <button className={styles.btnDelete} onClick={handleDelete}>
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
