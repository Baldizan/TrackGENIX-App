import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTasks } from 'redux/Tasks/thunks';
import { editTimeSheet } from 'redux/TimeSheets/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import { schema } from './validations';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';

const EmployeeTimesheetsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTimesheet] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.timesheets);

  const [modalDisplay, setModalDisplay] = useState(false);
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
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
      editTimeSheet(selectedTimesheet._id, {
        ...data,
        hours: selectedTimesheet?.hours + data.hours
      })
    );
    setModalDisplay(true);
  };

  const handleCloseModal = () => {
    if (!error) {
      setModalDisplay(false);
      history.push(`/employee/time-sheets`);
    } else {
      setModalDisplay(false);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title={titleForm}
          secondColumnIndex={3}
          noValidate={!isValid}
        >
          <Input
            name="project"
            value={selectedTimesheet?.projectName}
            title="Project"
            placeholder="Select a project"
            error={errors.project?.message}
            disabled
          />
          <Input
            name="task"
            value={selectedTimesheet?.taskDescription}
            title="Task description"
            placeholder="Select a task"
            error={errors.task?.message}
            disabled
          />
          <Input
            name="employee"
            value={selectedTimesheet?.employeeFormat}
            title="Employee"
            placeholder="Select an employee"
            error={errors.employee?.message}
            disabled
          />
          <Input
            name="description"
            value={selectedTimesheet?.description}
            title="Description"
            placeholder="Add a description"
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
            title="Hours"
            placeholder="Add hours"
            error={errors.hours?.message}
            required
          />
        </Form>
      )}
      {modalDisplay && (
        <Modal
          heading={error ? error : `Time Sheet successfully submitted!`}
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default EmployeeTimesheetsForm;
