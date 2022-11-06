import { useEffect, useState } from 'react';
import styles from '../projects.module.css';

const ProjectsForm = () => {
  const search = window.location.search;
  const [allEmployees, saveAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedRate, setSelectedRate] = useState();
  const [employees] = useState([]);
  const [employee, saveEmployee] = useState({
    id: '',
    role: '',
    rate: ''
  });
  const [activeValue, changeActiveValue] = useState(false);
  const [projectBody, setProjectBody] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: activeValue,
    employees: []
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
          employees.splice(0, employees.length);
          for (let i = 0; i < response.data.employees.length; i++) {
            employee.id = response.data.employees[i].id._id;
            employee.role = response.data.employees[i].role;
            employee.rate = response.data.employees[i].rate;
            employees.push(employee);
          }
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
      console.log(employees);
    }
  }, []);

  const sendProject = () => {
    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id=') + 3);
      fetch(`${process.env.REACT_APP_API_URL}projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      })
        .then((response) => response.json())
        .then(function (response) {
          if (!response.error) {
            alert(`Project ${projectBody.name} updated successfully!`);
            window.location.assign('/projects');
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectBody)
      })
        .then((response) => response.json())
        .then(function (response) {
          if (!response.error) {
            alert(`Project ${projectBody.name} created successfully!`);
            window.location.assign('/projects');
          }
        });
    }
  };

  const onChangeValue = (key, value, keyArray = false) => {
    if (keyArray) {
      setProjectBody({
        ...projectBody
      });
    } else {
      setProjectBody({ ...projectBody, [key]: value });
    }
  };

  const handleChangeActive = (e) => {
    changeActiveValue(e.target.value);
    setProjectBody({ ...projectBody, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    setSelectedEmployee(e.target.value);
    saveEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleChangeRole = (e) => {
    setSelectedRole(e.target.value);
    saveEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleChangeRate = (e) => {
    setSelectedRate(e.target.value);
    saveEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const assingEmployee = () => {
    setProjectBody({
      ...projectBody,
      employees: [...projectBody.employees, employee]
    });
    console.log(projectBody);
  };

  return (
    <section className={styles.container}>
      <form className={styles.container}>
        <label htmlFor="projectName">Project name:</label>
        <input
          id="name"
          name="name"
          placeholder="Project name"
          value={projectBody.name}
          onChange={(e) => onChangeValue('name', e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          placeholder="Last description"
          value={projectBody.description}
          onChange={(e) => onChangeValue('description', e.target.value)}
        />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          placeholder="Start Date"
          value={projectBody.startDate}
          onChange={(e) => onChangeValue('startDate', e.target.value)}
        />
        <label htmlFor="endDAte">End Date:</label>
        <input
          type="date"
          id="endDAte"
          name="endDAte"
          placeholder="End Date"
          value={projectBody.endDate}
          onChange={(e) => onChangeValue('endDate', e.target.value)}
        />
        <label htmlFor="status">Active:</label>
        <select name="active" value={projectBody.active} onChange={handleChangeActive}>
          <option value="false">Inactive</option>
          <option value="true">Active</option>
        </select>
        <label htmlFor="client">Client:</label>
        <input
          id="client"
          name="client"
          placeholder="Client"
          value={projectBody.clientName}
          onChange={(e) => onChangeValue('clientName', e.target.value)}
        />
        <div>
          <h3>Employees:</h3>
          {/* <table>
            <tbody>
              {employees.map((employee) => {
                <tr>
                  <td>{employee.id}</td>
                  <td>{employee.role}</td>
                  <td>{employee.rate}</td>
                  <td>Hola</td>
                </tr>;
              })}
            </tbody>
          </table> */}
          <select
            name="id"
            placeholder="Employee"
            value={selectedEmployee}
            onChange={handleChangeEmployee}
          >
            <option value="">Employees</option>
            {allEmployees.map((employee) => {
              return (
                <option key={employee._id} value={employee._id}>
                  {employee.name} {employee.lastName}
                </option>
              );
            })}
          </select>
          <select name="role" placeholder="Role" value={selectedRole} onChange={handleChangeRole}>
            <option value="">Role</option>
            <option value="DEV">DEV</option>
            <option value="TL">TL</option>
            <option value="QA">QA</option>
            <option value="PM">PM</option>
          </select>
          <input
            id="rate"
            name="rate"
            placeholder="Rate"
            value={selectedRate}
            onChange={handleChangeRate}
          />
          <button type="button" onClick={() => assingEmployee()}>
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
