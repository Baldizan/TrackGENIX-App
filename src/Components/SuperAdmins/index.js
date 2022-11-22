import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from 'redux/SuperAdmins/thunks';
import styles from './super-admins.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Error from 'Components/Shared/Error';
import Loader from 'Components/Shared/Loader';

const SuperAdmins = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email' };
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: superAdmins, isPending, error } = useSelector((state) => state.superAdmins);

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const deleteSuperAdmin = () => {
    dispatch(deleteSuperAdmins(selectedItem._id));
    setSuccessModalDisplay(true);
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
          addRedirectLink={'super-admins/form'}
          itemsPerPage={5}
        />
      )}
      {error && <Error text={error} />}
      {successModalDisplay && (
        <Modal
          heading={`${selectedItem.name} ${selectedItem.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      )}
      {modalDisplay && (
        <Modal
          heading={`Are you sure you want to delete Super Admin: ${selectedItem.name} ${selectedItem.lastName}?`}
          setModalDisplay={setModalDisplay}
          theme={'confirm'}
        >
          <p>This change can not be undone!</p>
          <div className={styles.buttons}>
            <Button
              label={'Cancel'}
              theme={'primary'}
              onClick={() => {
                setModalDisplay();
              }}
            />
            <Button
              label="Confirm"
              theme="tertiary"
              onClick={() => {
                deleteSuperAdmin();
                setModalDisplay(false);
              }}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default SuperAdmins;
