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
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email' };
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
    }).then(() => {
      const updatedAdminList = admins.filter((admin) => admin._id !== selectedAdmin._id);
      saveAdmins(updatedAdminList);
    });
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
      <Table
        data={admins}
        headers={headers}
        editItem={addEditAdmin}
        deleteItem={handleDeleteAdmin}
        title={'Admins'}
        addRedirectLink={'/admins/form'}
        itemsPerPage={5}
      />
      {deleteModalDisplay && (
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
      )}
      {successModalDisplay && (
        <Modal
          heading={`Admin ${selectedAdmin.name} ${selectedAdmin.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      )}
      {errorModalDisplay && (
        <Modal
          heading={`Could not delete admin ${selectedAdmin.name} ${selectedAdmin.lastName}!`}
          setModalDisplay={setErrorModalDisplay}
          theme={'error'}
        />
      )}
    </section>
  );
};

export default Admins;
