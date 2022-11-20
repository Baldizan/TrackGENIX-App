import styles from './admins.module.css';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/Admins/thunks';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';

const Admins = () => {
  const { list: adminsList, isPending, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email' };
  const history = useHistory();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const adminDelete = () => {
    showSuccessModal(true);
    dispatch(deleteAdmin(selectedAdmin._id));
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
      {isPending && <p>...Loading</p>}
      {!isPending && !error && (
        <Table
          data={adminsList}
          headers={headers}
          editItem={addEditAdmin}
          deleteItem={handleDeleteAdmin}
          title={'Admins'}
          addRedirectLink={'/admins/form'}
          itemsPerPage={5}
        />
      )}
      {error && <p>Admin not found</p>}
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
                adminDelete();
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
