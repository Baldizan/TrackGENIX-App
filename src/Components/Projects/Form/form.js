import { useEffect, useState } from 'react';
import styles from '../projects.module.css';

const ProjectsForm = () => {
  const search = window.location.search;
  const [project, setProject] = useState({});
  const [employees, saveEmployees] = useState([]);
  const [projectNameValue, setProjectName] = useState('');
  const [projectDescriptionValue, setDescription] = useState('');
  const [projectEmployeesValue, setEmployees] = useState([]);
  const [projectStartDateValue, setStartDate] = useState('');
  const [projectEndDateValue, setEndDate] = useState('');
  const [projectStatusValue, setStatus] = useState(false);
  const [projectClientValue, setClient] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => saveEmployees(response.data || []));
  }, []);

  const sendProject = () => {
    const body = JSON.stringify({
      name: projectNameValue,
      description: projectDescriptionValue,
      employees: projectEmployeesValue,
      startDate: projectStartDateValue,
      endDate: projectEndDateValue,
      active: projectStatusValue,
      clientName: projectClientValue
    });

    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id='), 24);
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response.data));
      window.location.assign('/projects');
    }
  };

  const projectNameInput = (event) => {
    setProjectName(event.target.value);
  };
  const descriptionInput = (event) => {
    setDescription(event.target.value);
  };
  const employeesInput = (event) => {
    setEmployees([...projectEmployeesValue, { id: event.target.value, role: 'DEV', rate: 100 }]);
  };
  const startDateInput = (event) => {
    setStartDate(event.target.value);
  };
  const endDAteInput = (event) => {
    setEndDate(event.target.value);
  };
  const statusInput = (event) => {
    setStatus(event.target.value);
  };
  const clientInput = (event) => {
    setClient(event.target.value);
  };

  useEffect(() => {
    if (project._id) {
      setProjectName(project.name);
      setDescription(project.description);
      setEmployees(project.employees);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setStatus(project.status);
      setClient(project.clientName);
    }
  }, [project]);

  useEffect(() => {
    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id=') + 3);

      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProject(response.data);
        });
    }
  }, []);

  return (
    <section className={styles.container}>
      <form className={styles.container}>
        <label htmlFor="projectName">Project name:</label>
        <input
          id="projectName"
          name="projectName"
          placeholder="Project name"
          required
          value={projectNameValue}
          onChange={projectNameInput}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          placeholder="Last description"
          required
          value={projectDescriptionValue}
          onChange={descriptionInput}
        />
        <div>
          <label htmlFor="employees">Employees:</label>
          <select
            name="employees"
            placeholder="Employees"
            required
            value={projectEmployeesValue}
            onChange={employeesInput}
          >
            {employees.map((employee) => {
              return (
                <option key={employee._id} value={employee._id}>
                  {employee.name} {employee.lastName}
                </option>
              );
            })}
          </select>
        </div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          placeholder="Start Date"
          required
          value={projectStartDateValue}
          onChange={startDateInput}
        />
        <label htmlFor="endDAte">End Date:</label>
        <input
          type="date"
          id="endDAte"
          name="endDAte"
          placeholder="End Date"
          required
          value={projectEndDateValue}
          onChange={endDAteInput}
        />
        <label htmlFor="status">Active:</label>
        <input
          type="checkbox"
          id="status"
          name="status"
          required
          value={projectStatusValue}
          onChange={statusInput}
        />
        <label htmlFor="client">Client:</label>
        <input
          id="client"
          name="client"
          placeholder="Client"
          required
          value={projectClientValue}
          onChange={clientInput}
        />
      </form>
      <button onClick={sendProject}>Add</button>
      <a href="/projects">
        <button>Cancel</button>
      </a>
    </section>
  );
};

export default ProjectsForm;
