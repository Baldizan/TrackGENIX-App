import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Shared/Table/table.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const SuperAdmins = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);

  const [list, setList] = useState([]);
  const headers = { name: 'name', lastName: 'Last Name', email: 'Email' };
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
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
    }).then(() => {
      setList([...list.filter((listItem) => listItem._id !== selectedItem._id)]);
    });
  };

  const handleEdit = (item) => {
    history.push('/super-admins/form', { id: item._id });
  };

  return (
    <section className={styles.container}>
      <Table
        headers={headers}
        data={list}
        editItem={handleEdit}
        deleteItem={deleteItem}
        title={'Super Admins'}
        addRedirectLink={'super-admins/form'}
        itemsPerPage={5}
      />
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
