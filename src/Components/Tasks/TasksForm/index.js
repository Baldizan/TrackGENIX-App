import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { postTask, putTask, getTasks } from 'redux/Tasks/thunks';
import styles from './tasksForm.module.css';
import { schema } from './validations';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const TasksForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.tasks);
  const [selectedTask] = useState(history.location.state);
  const titleForm = selectedTask ? 'Edit Task' : 'Add Task';
  const [isModal, setIsModal] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getTasks());
    selectedTask &&
      reset({
        description: selectedTask?.description
      });
  }, []);

  const onSubmit = (data) => {
    if (selectedTask) {
      dispatch(putTask(selectedTask._id, data));
      setIsModal(true);
    } else {
      dispatch(postTask(data));
      setIsModal(true);
    }
  };

  const handleModalClose = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/tasks`);
    } else {
      setIsModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)} title={titleForm} noValidate={!isValid}>
        <Input
          error={errors.description?.message}
          register={register}
          name="description"
          title="Description"
          placeholder="Add a description"
          required
        />
      </Form>
      {isModal ? (
        <Modal
          setModalDisplay={handleModalClose}
          heading={error ? error : 'Task submitted successfully!'}
          theme={error ? 'error' : 'success'}
        ></Modal>
      ) : null}
    </section>
  );
};
export default TasksForm;
