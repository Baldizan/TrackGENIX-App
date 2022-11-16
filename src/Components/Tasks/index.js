import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/Tasks/thunks';
import styles from './tasks.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const Tasks = () => {
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const history = useHistory();
  const { list: tasks, isPending, error } = useSelector((state) => state.tasks);
  const headers = { description: 'Description' };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteItem = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${selectedItem._id}`, {
      method: 'delete'
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    history.push(`/tasks/form`, { ...item });
  };

  return (
    <section className={styles.container}>
      {isPending && <p>...loading</p>}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={tasks}
          editItem={handleEdit}
          deleteItem={deleteItem}
          title="Tasks"
          addRedirectLink="/tasks/form"
          itemsPerPage={5}
        />
      )}
      {modalDisplay && (
        <Modal
          heading="Are you sure you want to delete this task?"
          setModalDisplay={setModalDisplay}
          theme="confirm"
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
