import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timeSheetsForm.module.css';
import Form from '../../Shared/Form';
import { Input, Select } from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/Projects/thunks';
import { getTasks } from '../../../redux/Tasks/thunks';
import { getEmployees } from '../../../redux/Employees/thunks';
import { addTimeSheet, editTimeSheet } from '../../../redux/TimeSheets/thunks';

const TimeSheetsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTimesheet] = useState(history.location.state);
  const [timeSheetInput, setTimeSheetInput] = useState(
    selectedTimesheet ?? {
      project: '',
      task: '',
      employee: '',
      description: '',
      date: '',
      hours: ''
    }
  );
  const { isPending, error } = useSelector((state) => state.timesheets);
  const { list: employees } = useSelector((state) => state.employees);
  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);

  const [modalDisplay, setModalDisplay] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
    dispatch(getTasks());
  }, []);

  const validation = () => {
    setInvalid(Object.values(timeSheetInput).some((x) => x === ''));
  };

  const onChange = (e) => {
    validation();
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedTimesheet) {
      dispatch(editTimeSheet(timeSheetInput, selectedTimesheet._id));
      setModalDisplay(true);
    } else {
      dispatch(addTimeSheet(timeSheetInput));
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
      <Form onSubmit={onSubmit} title={titleForm} noValidate={invalid} secondColumnIndex={3}>
        <Select
          onChange={onChange}
          value={timeSheetInput.project}
          name="project"
          arrayToMap={projectsMap}
          title="Project"
          placeholder="Select a project"
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.task}
          name="task"
          arrayToMap={tasksMap}
          title="Task"
          placeholder="Select a task"
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.employee}
          name="employee"
          arrayToMap={employeesMap}
          title="Employee"
          placeholder="Select an employee"
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.description}
          name="description"
          title="Description"
          placeholder="Add a description"
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.date}
          name="date"
          type="date"
          title="Date"
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.hours}
          name="hours"
          type="number"
          title="Hours"
          placeholder="Assign hours"
          required
        />
      </Form>
      {isPending && <p>...Loading</p>}
      {modalDisplay && (
        <Modal
          heading={error ? error : `Time Sheet submited successfully!`}
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default TimeSheetsForm;
