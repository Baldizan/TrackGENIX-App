import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks, deleteTask } from 'redux/Tasks/thunks';
import styles from './tasks.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const Tasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list: task, isPending, error } = useSelector((state) => state.tasks);
  const [selectedItem, setSelectedItem] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ heading: '', theme: '' });
  const headers = { description: 'Description' };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteTasks = async () => {
    dispatch(deleteTask(selectedItem._id));
    if (error) {
      setModalContent({ heading: `There was an error: ${error}`, theme: 'error' });
    } else {
      setModalContent({
        heading: `Task ${selectedItem.description} deleted successfully!`,
        theme: 'success'
      });
    }
    setFeedbackModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsModal(true);
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
          data={task}
          editItem={handleEdit}
          deleteItem={handleDelete}
          title="Tasks"
          redirectLink="/tasks/form"
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {!isPending && isModal && (
        <Modal
          heading="Are you sure you want to delete this Task?"
          setModalDisplay={setIsModal}
          theme="confirm"
        >
          <p>This change cannot be undone!</p>
          <Button
            label={'Cancel'}
            theme={'primary'}
            onClick={() => {
              setIsModal();
            }}
          />
          <Button
            label="Confirm"
            theme="tertiary"
            onClick={() => {
              deleteTasks();
              setIsModal(false);
            }}
          />
        </Modal>
      )}
      {feedbackModal && (
        <Modal
          setModalDisplay={setFeedbackModal}
          heading={modalContent.heading}
          theme={modalContent.theme}
        ></Modal>
      )}
    </section>
  );
};

export default Tasks;
