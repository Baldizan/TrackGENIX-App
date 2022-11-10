import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Shared/Table/table.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const SuperAdmins = () => {
  const [displayRange, setDisplayRange] = useState({ x: 0, y: 5, z: 0 });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);

  const [list, setList] = useState([]);
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    email: 'Email'
  };
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
    history.push(`/super-admins/form`, item);
  };

  return (
    <section className={styles.container}>
      <Button label={'Add new SuperAdmin +'} onClick={() => history.push('/super-admins/form')} />
      <Table
        headers={headers}
        data={list.slice(displayRange.x, displayRange.y)}
        editItem={handleEdit}
        deleteItem={deleteItem}
      />
      <div className={styles.nav}>
        <Button
          onClick={() =>
            setDisplayRange({
              x: displayRange.x - 5,
              y: displayRange.y - 5,
              z: displayRange.z - 1
            })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
          hidden={displayRange.x === 0}
        />
        <p>{displayRange.z}</p>
        <Button
          onClick={() =>
            setDisplayRange({
              x: displayRange.x + 5,
              y: displayRange.y + 5,
              z: displayRange.z + 1
            })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-right-solid.svg`}
          hidden={list.slice(displayRange.x + 5, displayRange.y + 5).length === 0}
        />
      </div>
      {successModalDisplay ? (
        <Modal
          heading={`${selectedItem.name} ${selectedItem.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      ) : null}
      {modalDisplay && (
        <Modal
          heading={'Are you sure you want to delete this SuperAdmin?'}
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
