import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editTimeSheet } from 'redux/TimeSheets/thunks';
import { getTasks } from 'redux/Tasks/thunks';
import styles from './form.module.css';
import { schema } from './validations';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';

const EmployeeTimesheetsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedTimesheet] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.timesheets);
  const token = sessionStorage.getItem('token');
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

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    dispatch(getTasks());
    selectedTimesheet &&
      reset({
        date: today
      });
  }, []);

  const onSubmit = (data) => {
    dispatch(
      editTimeSheet(
        selectedTimesheet._id,
        {
          ...data,
          hours: selectedTimesheet?.hours + data.hours
        },
        token
      )
    );
    setIsModal(true);
  };

  const handleModalClose = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/employee/time-sheets`);
    } else {
      setIsModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Add Hours"
          secondColumnIndex={3}
          noValidate={!isValid}
        >
          <Input
            name="project"
            value={selectedTimesheet?.projectName}
            title="Project"
            placeholder="Project unavailable"
            error={errors.project?.message}
            disabled
          />
          <Input
            name="task"
            value={selectedTimesheet?.taskDescription}
            title="Task description"
            placeholder="Task unavailable"
            error={errors.task?.message}
            disabled
          />
          <Input
            name="description"
            value={selectedTimesheet?.description}
            title="Description"
            placeholder="Description unavailable"
            error={errors.description?.message}
            disabled
          />
          <Input
            register={register}
            name="date"
            type="date"
            title="Date"
            error={errors.date?.message}
            required
          />
          <Input
            register={register}
            name="hours"
            type="number"
            min="0"
            title="Hours"
            placeholder="Add hours"
            error={errors.hours?.message}
            required
          />
        </Form>
      )}
      {isModal && (
        <Modal
          heading={error ? 'There has been an error!' : `Success!`}
          message={error ? error : 'Hours successfully added.'}
          setModalDisplay={handleModalClose}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default EmployeeTimesheetsForm;
