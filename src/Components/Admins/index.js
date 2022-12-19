import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/Admins/thunks';
import styles from './admins.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import Error from 'Components/Shared/Error';
import Loader from 'Components/Shared/Loader';

const Admins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState({});
  const { list: adminsArray, isPending, error } = useSelector((state) => state.admins);
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email' };
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getAdmins(token));
  }, []);

  const adminDelete = () => {
    showSuccessModal(true);
    dispatch(deleteAdmin(adminToDelete._id));
  };

  const handleDelete = (item) => {
    setAdminToDelete(item);
    setIsDeleteModal(true);
  };

  const showSuccessModal = () => {
    setIsSuccessModal(true);
  };

  const addEditAdmin = (item) => {
    history.push(`/admins/form`, item);
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && !error && (
        <Table
          data={adminsArray}
          headers={headers}
          editItem={addEditAdmin}
          deleteItem={handleDelete}
          title={'Admins'}
          addRedirectLink={'/admins/form'}
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {error && <Error text={error} />}
      {isDeleteModal && (
        <Modal
          heading={`Are you sure you want to delete admin ${adminToDelete.name} ${adminToDelete.lastName}?`}
          setModalDisplay={setIsDeleteModal}
          theme={'confirm'}
        >
          <p>This change cannot be undone!</p>
          <Button
            label={'Cancel'}
            theme={'primary'}
            onClick={() => {
              setIsDeleteModal();
            }}
          />
          <Button
            label={'Delete'}
            theme={'tertiary'}
            onClick={() => {
              adminDelete();
              setIsDeleteModal(false);
            }}
          />
        </Modal>
      )}
      {isSuccessModal && (
        <Modal
          heading={`Admin ${adminToDelete.name} ${adminToDelete.lastName} successfully deleted!`}
          setModalDisplay={setIsSuccessModal}
          theme={'success'}
        />
      )}
      {isErrorModal && (
        <Modal
          heading={`Could not delete admin ${adminToDelete.name} ${adminToDelete.lastName}!`}
          setModalDisplay={setIsErrorModal}
          theme={'error'}
        />
      )}
    </section>
  );
};

export default Admins;
