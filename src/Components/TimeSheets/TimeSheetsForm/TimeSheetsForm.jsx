import React, { useState, useEffect } from 'react';
import './TimeSheetsForm.css';

const TimeSheetsForm = () => {
  const paramsURL = new URLSearchParams(window.location.search);
  const editId = paramsURL.get('id');
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

  useEffect(() => {
    if (editId) {
      fetch(`${process.env.REACT_APP_API_URL}/timesheets/${editId}`)
        .then((res) => res.json())
        .then((json) => {
          setTimeSheetInput({
            project: json.data.project?._id,
            task: json.data.task?._id,
            employee: json.data.employee?._id,
            description: json.data.description,
            date: json.data.date,
            hours: json.data.hours
          });
          setSelectedProject(json.data.project?._id);
          setSelectedEmployee(json.data.employee?._id);
          setSelectedTask(json.data.task?._id);
        });
      setTitleForm('Edit');
    }
    setSelectedProject('');
    console.log('aqui', projects);
  }, []);

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

  console.log(timeSheetInput.employee);

  const onChange = (e) => {
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedProject && selectedTask && selectedEmployee) {
      if (editId) {
        editItem(timeSheetInput);
      } else {
        addItem(timeSheetInput);
      }
    } else {
      alert('All fields are required');
    }
  };

  const addItem = ({ project, task, employee, description, date, hours }) => {
    const newItem = {
      project,
      task,
      employee,
      description,
      date,
      hours: +hours
    };

    fetch(`${process.env.REACT_APP_API_URL}/timeSheets`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
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
      hours: +hours
    };

    fetch(`${process.env.REACT_APP_API_URL}/timeSheets/${editId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
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
            <select name="project" value={selectedProject} onChange={handleChangeProject} required>
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <label>Task</label>
            <select name="task" value={selectedTask} onChange={handleChangeTask} required>
              <option value="">Select a task</option>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.description}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <label>Employee</label>
            <select
              name="employee"
              value={selectedEmployee}
              onChange={handleChangeEmployee}
              required
            >
              <option value="">Select a employee</option>
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
              required
            />
          </div>
          <div className="column">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={timeSheetInput.date}
              onChange={onChange}
              required
            />
          </div>
          <div className="column">
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              value={timeSheetInput.hours}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <input className="btn" type="submit" value="Submit" />
      </form>
    </>
  );
};
export default TimeSheetsForm;
