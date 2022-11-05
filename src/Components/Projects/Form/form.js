import { useEffect, useState } from 'react';
import styles from '../projects.module.css';

const ProjectsForm = () => {
  const search = window.location.search;
  // const [project, setProject] = useState({});
  const [allEmployees, saveAllEmployees] = useState([]);
  const [employees, saveEmployees] = useState([
    {
      employee: '',
      role: '',
      rate: ''
    }
  ]);
  const [projectBody, setProjectBody] = useState({
    neme: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: '',
    employees: employees
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}employees`)
      .then((response) => response.json())
      .then((response) => saveAllEmployees(response.data));
  }, []);

  useEffect(() => {
    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id=') + 3);

      fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProjectBody({
            name: response.data.name,
            description: response.data.description,
            startDate: response.data.startDate.substring(0, 10),
            endDate: response.data.endDate.substring(0, 10),
            clientName: response.data.clientName,
            active: response.data.active,
            employees: employees
          });
        });
    }
  }, []);

  const sendProject = () => {
    if (search.match('id=')) {
      // const id = search.substring(search.indexOf('id=') + 3);
      // fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: projectBody
      // })
      //   .then((response) => response.json())
      //   .then((response) => console.log(response));
      console.log(projectBody);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: projectBody
      })
        .then((response) => response.json())
        .then((response) => console.log(response.data));
      window.location.assign('/projects');
    }
  };

  const onChangeValue = (key, value, keyArray = false) => {
    if (keyArray) {
      setProjectBody({
        ...projectBody,
        employees: [{ ...projectBody.employees[0], [key]: value }]
      });
    } else {
      setProjectBody({ ...projectBody, [key]: value });
    }
  };

  const assingEmployee = (id, role, rate) => {
    useEffect(() => {
      saveEmployees({
        employee: id,
        role: role,
        rate: rate
      });
    }, []);
  };

  return (
    <section className={styles.container}>
      <form className={styles.container}>
        <label htmlFor="projectName">Project name:</label>
        <input
          id="projectName"
          name="projectName"
          placeholder="Project name"
          required
          value={projectBody.name}
          onChange={(e) => onChangeValue('name', e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          placeholder="Last description"
          required
          value={projectBody.description}
          onChange={(e) => onChangeValue('description', e.target.value)}
        />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          placeholder="Start Date"
          required
          value={projectBody.startDate}
          onChange={(e) => onChangeValue('startDate', e.target.value)}
        />
        <label htmlFor="endDAte">End Date:</label>
        <input
          type="date"
          id="endDAte"
          name="endDAte"
          placeholder="End Date"
          required
          value={projectBody.endDate}
          onChange={(e) => onChangeValue('endDate', e.target.value)}
        />
        <label htmlFor="status">Active:</label>
        <input
          type="checkbox"
          id="status"
          name="status"
          value={projectBody.active}
          onChange={(e) => onChangeValue('active', e.target.value)}
        />
        <label htmlFor="client">Client:</label>
        <input
          id="client"
          name="client"
          placeholder="Client"
          required
          value={projectBody.clientName}
          onChange={(e) => onChangeValue('clientName', e.target.value)}
        />
        <div>
          <h3>Employees:</h3>
          {/* <table>
            <tbody>
              {employees.map((employee) => {
                <tr>
                  <td>{employee.employee}</td>
                  <td>{employee.role}</td>
                  <td>{employee.rate}</td>
                </tr>;
              })}
            </tbody>
          </table> */}
          <select name="employees" placeholder="Employees" required value={employees.employee}>
            <option value="">Employees</option>
            {allEmployees.map((employee) => {
              return (
                <option key={employee._id} value={employee._id}>
                  {employee.name} {employee.lastName}
                </option>
              );
            })}
          </select>
          <select name="role" placeholder="Role" required value={employees.role}>
            <option value="">Role</option>
            <option value="DEV">DEV</option>
            <option value="TL">TL</option>
            <option value="QA">QA</option>
            <option value="PM">PM</option>
          </select>
          <input id="rate" name="rate" placeholder="Rate" required value={employees.rate} />
          <button
            type="button"
            onClick={assingEmployee(employees.employee, employees.role, employees.rate)}
          >
            Assign
          </button>
        </div>
      </form>
      <button onClick={sendProject}>Add</button>
      <a href="/projects">
        <button>Cancel</button>
      </a>
    </section>
  );
};

export default ProjectsForm;
