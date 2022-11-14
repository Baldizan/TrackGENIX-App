import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Shared/Table/table.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins } from '../../redux/SuperAdmins/thunks';

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

  const deleteItem = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const showSuccessModal = () => {
    setSuccessModalDisplay(true);
  };

  const handleDelete = () => {
    showSuccessModal(true);
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${selectedItem._id}`, {
      method: 'delete'
    });
  };

  const handleEdit = (item) => {
    history.push('/super-admins/form', { id: item._id });
  };
  console.log(superAdmins);
  return (
    <section className={styles.container}>
      {isPending && <p>...loading</p>}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={superAdmins ?? []}
          editItem={handleEdit}
          deleteItem={deleteItem}
          title={'Super Admins'}
          addRedirectLink={'super-admins/form'}
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
      {successModalDisplay && (
        <Modal
          heading={`${selectedItem.name} ${selectedItem.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      )}
      {modalDisplay && (
        <Modal
          heading={'Are you sure you want to delete this Super-Admin?'}
          setModalDisplay={setModalDisplay}
          theme={'confirm'}
        >
          <Button
            label="Confirm"
            theme="tertiary"
            onClick={() => {
              handleDelete();
              setModalDisplay(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default SuperAdmins;
