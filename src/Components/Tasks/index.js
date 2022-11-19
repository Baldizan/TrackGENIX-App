import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks, deleteTask } from '../../redux/Tasks/thunks';
import styles from './tasks.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const Tasks = () => {
  const dispatch = useDispatch();
  const { list, isPending, error } = useSelector((state) => state.tasks);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalDisplay, setModalDisplay] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ heading: '', theme: '' });
  const history = useHistory();
  const headers = { description: 'Description' };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleDelete = (item) => {
    setSelectedItem(item._id);
    setModalDisplay(true);
  };

  const deleteItem = async () => {
    dispatch(deleteTask(selectedItem));
    if (error) {
      setFeedback({ heading: `There was an error: ${error}`, theme: 'error' });
    } else {
      setFeedback({ heading: 'Task deleted', theme: 'success' });
    }
    setFeedbackModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    history.push(`/tasks/form`, { ...item });
  };

  return (
    <section className={styles.container}>
      {isPending && <p>Loading...</p>}
      {error && <p>There has been an error: {error}</p>}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={list}
          editItem={handleEdit}
          deleteItem={handleDelete}
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
              deleteItem();
              setModalDisplay(false);
            }}
          />
        </Modal>
      )}
      {feedbackModal && (
        <Modal
          setModalDisplay={setFeedbackModal}
          heading={feedback.heading}
          theme={feedback.theme}
        ></Modal>
      )}
    </section>
  );
};

export default Tasks;
