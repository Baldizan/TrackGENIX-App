import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timeSheetsForm.module.css';
import Form from '../../Shared/Form';
import { Input, Select } from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import { useSelector } from 'react-redux';

const TimeSheetsForm = () => {
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
  const { list: employees } = useSelector((state) => state.employees);
  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const [invalid, setInvalid] = useState(true);
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';
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
      editItem(timeSheetInput);
    } else {
      addItem(timeSheetInput);
    }
  };

  const addItem = ({ project, task, employee, description, date, hours }) => {
    const newItem = {
      project,
      task,
      employee,
      description,
      date,
      hours
    };

    fetch(`${process.env.REACT_APP_API_URL}/timeSheets`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const editItem = ({ project, task, employee, description, date, hours }) => {
    const editItem = {
      project,
      task,
      employee,
      description,
      date,
      hours: +hours
    };

    fetch(`${process.env.REACT_APP_API_URL}/timeSheets/${selectedTimesheet._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editItem)
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const handleCloseModal = () => {
    if (!modalContent.error) {
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
export default TimeSheetsForm;
