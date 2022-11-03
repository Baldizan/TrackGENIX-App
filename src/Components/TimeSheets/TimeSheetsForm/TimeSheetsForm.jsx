import React, { useState, useEffect } from 'react';
import './TimeSheetsForm.css';

const TimeSheetsForm = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [titleForm, setTitleForm] = useState('Add new Timesheet');
  const [timeSheetInput, setTimeSheetInput] = useState({
    project: '',
    task: '',
    employee: '',
    description: '',
    date: '',
    hours: ''
  });

  const editId = sessionStorage.getItem('editId');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((json) => {
        setProjects(json.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((json) => {
        setTasks(json.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.data);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('action') === 'edit') {
      fetch(`${process.env.REACT_APP_API_URL}/timesheets/${editId}`)
        .then((res) => res.json())
        .then((json) => {
          setTimeSheetInput({
            project: json.data.project._id,
            task: json.data.task.description,
            employee: json.data.employee._id,
            description: json.data.description,
            date: json.data.date,
            hours: json.data.hours
          });
        });
      setTitleForm('Edit');
    }
  }, []);

  const onChange = (e) => {
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('action') === 'edit') {
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
      body: JSON.stringify(newItem)
    }).then(() => {
      window.location.href = '/time-sheets';
    });
  };

  const editItem = ({ project, task, employee, description, date, hours }) => {
    const editItem = {
      project,
      task,
      employee,
      description,
      date,
      hours
    };

    fetch(`${process.env.REACT_APP_API_URL}/timeSheets/${editId}`, {
      method: 'put',
      body: JSON.stringify(editItem)
    }).then(() => {
      window.location.href = '/time-sheets';
    });
  };

  const handleChangeProject = (e) => {
    setSelectedProject(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const handleChangeTask = (e) => {
    setSelectedTask(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    setSelectedEmployee(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="column">
        <h2 className="title-add">{titleForm}</h2>
        <div className="column">
          <div className="column">
            <label>Proyect name</label>
            <select name="project" value={selectedProject} onChange={handleChangeProject}>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <label>Task</label>
            <select name="task" value={selectedTask} onChange={handleChangeTask}>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.description}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <label>Employee</label>
            <select name="employee" value={selectedEmployee} onChange={handleChangeEmployee}>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={timeSheetInput.description}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <label>Date</label>
            <input type="date" name="date" value={timeSheetInput.date} onChange={onChange} />
          </div>
          <div className="column">
            <label>Hours</label>
            <input type="number" name="hours" value={timeSheetInput.hours} onChange={onChange} />
          </div>
        </div>
        <input className="btn" type="submit" value="Submit" />
      </form>
    </>
  );
};
export default TimeSheetsForm;
