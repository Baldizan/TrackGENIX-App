import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from 'redux/SuperAdmins/thunks';
import styles from './super-admins.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Error from 'Components/Shared/Error';
import Loader from 'Components/Shared/Loader';

const SuperAdmins = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ heading: '', message: '', theme: '' });
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email' };
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: superAdmins, isPending, error } = useSelector((state) => state.superAdmins);

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsModal(true);
  };

  const deleteSuperAdmin = () => {
    dispatch(deleteSuperAdmins(selectedItem._id));
    if (error) {
      setModalContent({ heading: 'There was an error!', message: error.message, theme: 'error' });
    } else {
      setModalContent({
        heading: 'Success!',
        message: `The super admin "${selectedItem.name} ${selectedItem.lastName}" was successfully deleted.`,
        theme: 'success'
      });
      setIsFeedbackModal(true);
    }
  };

  const handleEdit = (item) => {
    history.push('/super-admins/form', item);
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={superAdmins ?? []}
          editItem={handleEdit}
          deleteItem={handleDelete}
          title={'Super Admins'}
          redirectLink={'super-admins/form'}
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {error && <Error text={error} />}
      {isFeedbackModal && (
        <Modal
          heading={modalContent.heading}
          message={modalContent.message}
          setModalDisplay={setIsFeedbackModal}
          theme={modalContent.theme}
        />
      )}
      {isModal && (
        <Modal
          heading={`Are you sure you want to delete super admin ${selectedItem.name} ${selectedItem.lastName}?`}
          setModalDisplay={setIsModal}
          theme={'confirm'}
          message="This change cannot be undone!"
          confirmFunction={deleteSuperAdmin}
        />
      )}
    </section>
  );
};

export default SuperAdmins;
