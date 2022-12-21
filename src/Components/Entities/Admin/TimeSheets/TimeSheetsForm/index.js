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
  const [isModal, setIsModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    watch
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getProjects(token));
    dispatch(getEmployees(token));
    dispatch(getTasks(token));
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
      dispatch(editTimeSheet(selectedTimesheet._id, data, token));
      setIsModal(true);
    } else {
      dispatch(addTimeSheet(data, token));
      setIsModal(true);
    }
  };

  const handleModalClose = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/admin/time-sheets`);
    } else {
      setIsModal(false);
    }
  };

  const activeEmployees = employees?.filter((e) => {
    return e.active === true;
  });

  const employeesMap = activeEmployees?.map((employee) => ({
    id: employee._id,
    label: `${employee.name} ${employee.lastName}`
  }));
  const employeeSelected = watch('employee');
  const projectSelected = watch('project');
  const flteredProjects = projects?.filter((p) => {
    return p.employees?.find((e) => e.id._id === employeeSelected);
  });

  const projectsMap = flteredProjects?.map((project) => ({ id: project._id, label: project.name }));
  const tasksMap = tasks?.map((task) => ({ id: task._id, label: task.description }));

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
          <Select
            register={register}
            name="employee"
            value={employeeSelected}
            arrayToMap={employeesMap}
            title="Employee"
            placeholder="Select an employee"
            error={errors.employee?.message}
            required
          />
          <Select
            register={register}
            name="project"
            value={projectSelected}
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
      {!isPending && isModal && (
        <Modal
          heading={error ? 'There was an error!' : 'Success!'}
          message={error ?? 'Time Sheet successfully submitted.'}
          setModalDisplay={handleModalClose}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default TimeSheetsForm;
