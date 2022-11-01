import React, { useState, useEffect } from 'react';

const EditItem = ({ editItem }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setSEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [timeSheetInput, setTimeSheetInput] = useState({
    project: '',
    task: '',
    employee: '',
    description: '',
    date: '',
    hours: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then((res) => res.json())
      .then((json) => {
        console.log('data', json);
        setProjects(json.data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((json) => {
        console.log('data', json);
        setTasks(json.data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then((res) => res.json())
      .then((json) => {
        console.log('data', json);
        setSEmployees(json.data);
      });
  }, []);

  const onChange = (e) => {
    console.log('evento', e);
    console.log('e.target.name', e.target.name);
    console.log('e.target.value ', e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editItem(timeSheetInput);
    setTimeSheetInput({
      project: '',
      task: '',
      employee: '',
      description: '',
      date: '',
      hours: ''
    });
  };

  const handleChangeProject = (e) => {
    console.log(e.target.value);
    setSelectedProject(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const handleChangeTask = (e) => {
    console.log(e.target.value);
    setSelectedTask(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    console.log(e.target.value);
    setSelectedEmployee(e.target.value);
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="row">
      <div className="row">
        <select name="project" value={selectedProject} onChange={handleChangeProject}>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        <select name="task" value={selectedTask} onChange={handleChangeTask}>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.description}
            </option>
          ))}
        </select>
        <select name="employee" value={selectedEmployee} onChange={handleChangeEmployee}>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          value={timeSheetInput.description}
          onChange={onChange}
        />
        <input type="date" name="date" value={timeSheetInput.date} onChange={onChange} />
        <input type="number" name="hours" value={timeSheetInput.hours} onChange={onChange} />
      </div>
      <div className="flex-container">
        <input className="btn" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default EditItem;
