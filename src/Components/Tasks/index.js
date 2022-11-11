import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './tasks.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const Tasks = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
  }, []);

  const deleteItem = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${selectedItem._id}`, {
      method: 'delete'
    }).then(() => {
      setList([...list.filter((listItem) => listItem._id !== selectedItem._id)]);
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    history.push(`/tasks/form`, { ...item });
  };
  const headers = { _id: 'Task ID', description: 'Description' };
  return (
    <section className={styles.container}>
      <Table
        headers={headers}
        data={list}
        editItem={handleEdit}
        deleteItem={deleteItem}
        title={'Tasks'}
        addRedirectLink={'/tasks/form'}
        itemsPerPage={5}
      />
      {modalDisplay && (
        <Modal
          heading={'Are you sure you want to delete this task?'}
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

export default Tasks;
