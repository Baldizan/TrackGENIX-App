import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './tasksForm.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const TasksForm = () => {
  const history = useHistory();
  const [selectedTask] = useState(history.location.state);
  const [taskInput, setTaskInput] = useState({ description: selectedTask?.description ?? '' });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const [invalid, setInvalid] = useState(true);
  const titleForm = selectedTask ? 'Edit Task' : 'Add Task';

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
      editItem(taskInput);
    } else {
      addItem(taskInput);
    }
  };

  const handleCloseModal = () => {
    if (!modalContent.error) {
      setModalDisplay(false);
      history.push(`/tasks`);
    } else {
      setModalDisplay(false);
    }
  };

  const addItem = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: taskInput.description })
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const editItem = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${selectedTask._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: taskInput.description })
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  return (
    <section className={styles.container}>
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
      {modalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={handleCloseModal}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default TasksForm;
