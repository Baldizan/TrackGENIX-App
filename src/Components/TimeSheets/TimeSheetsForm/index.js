import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timeSheetsForm.module.css';
import Form from '../../Shared/Form';
import { Input, Select } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

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
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const [invalid, setInvalid] = useState(true);
  const titleForm = selectedTimesheet ? 'Edit Timesheet' : 'Add Timesheet';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((json) => {
        setTasks(json.data);
      });
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((json) => {
        setProjects(json.data);
      });
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.data);
      });
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

  const project = () => projects.map((project) => project._id);
  const task = () => tasks.map((task) => task._id);
  const employee = () => employees.map((employee) => employee._id);

  return (
    <section className={styles.container}>
      <Form onSubmit={onSubmit} title={titleForm} noValidate={invalid} secondColumnIndex={3}>
        <Select
          onChange={onChange}
          value={timeSheetInput.project}
          name="project"
          arrayToMap={project()}
          title={'Project'}
          placeholder="Select a project"
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.task}
          name="task"
          arrayToMap={task()}
          title={'Task'}
          placeholder="Select a task"
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.employee}
          name="employee"
          arrayToMap={employee()}
          title={'Employee'}
          placeholder="Select an employee"
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.description}
          name="description"
          title={'Description'}
          placeholder="Add a description"
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.date}
          name="date"
          type="date"
          title={'Date'}
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.hours}
          name="hours"
          type="number"
          title={'Hours'}
          placeholder="Assign hours"
          required
        />
      </Form>
      {modalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={setModalDisplay}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default TimeSheetsForm;
