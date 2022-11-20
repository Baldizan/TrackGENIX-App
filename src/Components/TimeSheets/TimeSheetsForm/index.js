import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timeSheetsForm.module.css';
import Form from 'Components/Shared/Form';
import { Input, Select } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/Projects/thunks';
import { getTasks } from 'redux/Tasks/thunks';
import { getEmployees } from 'redux/Employees/thunks';
import { addTimeSheet, editTimeSheet } from 'redux/TimeSheets/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const TimeSheetsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTimesheet] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.timesheets);
  const { list: employees } = useSelector((state) => state.employees);
  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);

  const [modalDisplay, setModalDisplay] = useState(false);
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
    dispatch(getTasks());
    selectedTimesheet &&
      reset({
        project: selectedTimesheet?.project,
        task: selectedTimesheet?.task,
        employee: selectedTimesheet?.employee,
        description: selectedTimesheet?.description,
        date: selectedTimesheet?.date,
        hours: selectedTimesheet?.hours
      });
  }, []);

  const onSubmit = (data) => {
    if (selectedTimesheet) {
      dispatch(editTimeSheet(selectedTimesheet._id, data));
      setModalDisplay(true);
    } else {
      dispatch(addTimeSheet(data));
      setModalDisplay(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
      setModalDisplay(false);
      history.push(`/time-sheets`);
    } else {
      setModalDisplay(false);
    }
  };

  const projectsMap = projects.map((project) => ({ id: project._id, label: project.name }));
  const tasksMap = tasks.map((task) => ({ id: task._id, label: task.description }));
  const employeesMap = employees.map((employee) => ({
    id: employee._id,
    label: `${employee.name} ${employee.lastName}`
  }));

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Form onSubmit={handleSubmit(onSubmit)} title={titleForm} secondColumnIndex={3}>
          <Select
            register={register}
            name="project"
            arrayToMap={projectsMap}
            title="Project"
            placeholder="Select a project"
            error={errors.project?.message}
            required
          />
          <Select
            register={register}
            name="task"
            arrayToMap={tasksMap}
            title="Task"
            placeholder="Select a task"
            error={errors.task?.message}
            required
          />
          <Select
            register={register}
            name="employee"
            arrayToMap={employeesMap}
            title="Employee"
            placeholder="Select an employee"
            error={errors.employee?.message}
            required
          />
          <Input
            register={register}
            name="description"
            title="Description"
            placeholder="Add a description"
            error={errors.description?.message}
            required
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
            placeholder="Assign hours"
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
export default TimeSheetsForm;
