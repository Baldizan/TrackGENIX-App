import styles from './admins.module.css';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const headers = ['name', 'lastName', 'email'];
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const deleteAdmin = () => {
    showSuccessModal(true);
    fetch(`${process.env.REACT_APP_API_URL}/admins/${selectedAdmin._id}`, {
      method: 'DELETE'
    });
    const updatedAdminList = admins.filter((admin) => admin._id !== selectedAdmin._id);
    saveAdmins(updatedAdminList);
  };

  const handleDeleteAdmin = (item) => {
    setSelectedAdmin(item);
    setDeleteModalDisplay(true);
  };

  const showSuccessModal = () => {
    setSuccessModalDisplay(true);
  };

  const addEditAdmin = (item) => {
    history.push(`/admins/form`, item);
  };

  return (
    <section className={styles.container}>
      <h2>Admin list</h2>
      <Button
        label={'Add admin'}
        theme={'primary'}
        onClick={() => {
          addEditAdmin();
        }}
      />
      <Table
        data={admins}
        headers={headers}
        editItem={addEditAdmin}
        deleteItem={handleDeleteAdmin}
      />
      {deleteModalDisplay ? (
        <Modal
          heading={`Do you want to delete admin ${selectedAdmin.name} ${selectedAdmin.lastName}?`}
          setModalDisplay={setDeleteModalDisplay}
          theme={'confirm'}
        >
          <p>This change can not be undone!</p>
          <div className={styles.buttons}>
            <Button
              label={'Cancel'}
              theme={'primary'}
              onClick={() => {
                setDeleteModalDisplay();
              }}
            />
            <Button
              label={'Delete'}
              theme={'tertiary'}
              onClick={() => {
                deleteAdmin();
                setDeleteModalDisplay(false);
              }}
            />
          </div>
        </Modal>
      ) : null}
      {successModalDisplay ? (
        <Modal
          heading={`Admin ${selectedAdmin.name} ${selectedAdmin.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      ) : null}
      {errorModalDisplay ? (
        <Modal
          heading={`Could not delete admin ${selectedAdmin.name} ${selectedAdmin.lastName}!`}
          setModalDisplay={setErrorModalDisplay}
          theme={'error'}
        />
      ) : null}
    </section>
  );
};

export default Admins;
