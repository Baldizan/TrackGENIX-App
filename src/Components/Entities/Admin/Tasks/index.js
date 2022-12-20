import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks, deleteTask } from 'redux/Tasks/thunks';
import styles from './tasks.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const Tasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list: task, isPending, error } = useSelector((state) => state.tasks);
  const [selectedItem, setSelectedItem] = useState({});
  const token = sessionStorage.getItem('token');
  const [isModal, setIsModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ heading: '', message: '', theme: '' });
  const headers = { description: 'Description' };

  useEffect(() => {
    dispatch(getTasks(token));
  }, []);

  const deleteTasks = async () => {
    dispatch(deleteTask(selectedItem._id, token));
    if (error) {
      setModalContent({ heading: 'There was an error', message: error, theme: 'error' });
    } else {
      setModalContent({
        heading: 'Success!',
        message: 'The task was successfully deleted!',
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
    history.push('/admin/tasks/form', item);
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
          redirectLink="/admin/tasks/form"
          itemsPerPage={5}
          isSearchEnabled
        />
      )}
      {!isPending && isModal && (
        <Modal
          heading="Confirmation required"
          setModalDisplay={setIsModal}
          message="Are you sure you want to delete this Task?"
          confirmFunction={deleteTasks}
        />
      )}
      {feedbackModal && (
        <Modal
          setModalDisplay={setFeedbackModal}
          heading={modalContent.heading}
          message={modalContent.message}
          theme={modalContent.theme}
        />
      )}
    </section>
  );
};

export default Tasks;
