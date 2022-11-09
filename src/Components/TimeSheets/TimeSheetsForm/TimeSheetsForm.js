import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timeSheetsForm.module.css';
import Form from '../../Shared/Form';
import { Input, Select } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const TimeSheetsForm = () => {
  const history = useHistory();
  const [selectedTimesheet] = useState(history.location.state);
  const [timeSheetInput, setTimeSheetInput] = useState(selectedTimesheet ?? {});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
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

  const onChange = (e) => {
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
      <Form onSubmit={onSubmit} title={titleForm}>
        <Select
          placeholder="test"
          onChange={onChange}
          value={timeSheetInput.project}
          name="project"
          arrayToMap={project()}
          title={'Project'}
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.task}
          name="task"
          arrayToMap={task()}
          title={'Task'}
          required
        />
        <Select
          onChange={onChange}
          value={timeSheetInput.employee}
          name="employee"
          arrayToMap={employee()}
          title={'Employee'}
          required
        />
        <Input
          onChange={onChange}
          value={timeSheetInput.description}
          name="description"
          title={'Description'}
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
