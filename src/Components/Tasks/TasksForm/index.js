import React, { useState } from 'react';
import { postTask, putTask } from '../../../redux/Tasks/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './tasksForm.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const TasksForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.tasks);
  const [selectedTask] = useState(history.location.state);
  const [taskInput, setTaskInput] = useState({ description: selectedTask?.description ?? '' });
  const [invalid, setInvalid] = useState(true);
  const titleForm = selectedTask ? 'Edit Task' : 'Add Task';
  const [feedbackModal, setFeedbackModal] = useState(false);

  const validation = () => {
    setInvalid(Object.values(taskInput).some((x) => x === ''));
  };

  const onChange = (e) => {
    validation();
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      dispatch(putTask(selectedTask._id, taskInput));
      setFeedbackModal(true);
    } else {
      dispatch(postTask(taskInput));
      setFeedbackModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
      setFeedbackModal(false);
      history.push(`/tasks`);
    } else {
      setFeedbackModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <p>Loading...</p>}
      <Form onSubmit={onSubmit} title={titleForm} noValidate={invalid}>
        <Input
          onChange={onChange}
          value={taskInput.description}
          name="description"
          title="Description"
          placeholder="Add a description"
          required
        />
      </Form>
      {feedbackModal ? (
        <Modal
          setModalDisplay={handleCloseModal}
          heading={selectedTask ? (error ? error : 'Task edited') : error ? error : 'Task added'}
          theme={error ? 'error' : 'success'}
        ></Modal>
      ) : null}
    </section>
  );
};
export default TasksForm;
