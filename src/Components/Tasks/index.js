import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './tasks.module.css';
import { getTasks, deleteTask } from 'redux/Tasks/thunks';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const Tasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list, isPending, error } = useSelector((state) => state.tasks);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalDisplay, setModalDisplay] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ heading: '', theme: '' });
  const headers = { description: 'Description' };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteItem = async () => {
    dispatch(deleteTask(selectedItem._id));
    if (error) {
      setFeedback({ heading: `There was an error: ${error}`, theme: 'error' });
    } else {
      setFeedback({ heading: 'Task deleted', theme: 'success' });
    }
    setFeedbackModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setModalDisplay(true);
  };

  const handleEdit = (item) => {
    history.push('/tasks/form', item);
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
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
          heading={`Are you sure you want to delete task: "${selectedItem.description}"?`}
          setModalDisplay={setModalDisplay}
          theme="confirm"
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
                deleteItem();
                setModalDisplay(false);
              }}
            />
          </div>
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
