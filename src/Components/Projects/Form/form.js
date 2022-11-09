import { useEffect, useState } from 'react';
import styles from '../projects.module.css';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
import { Input, Select } from '../../Shared/Input/index';

const ProjectsForm = () => {
  const paramsURL = new URLSearchParams(window.location.search);
  const projectId = paramsURL.get('id');
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

  const roles = ['Rol', 'DEV', 'TL', 'QA', 'PM'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => saveAllEmployees(response.data));
  }, []);

  useEffect(() => {
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
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
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
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
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
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

  const onChange = (e) => {
    setProjectBody({ ...projectBody, [e.target.name]: e.target.value });
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
  };

  console.log(allEmployees._id);

  return (
    <>
      <section className={styles.container}>
        <form className={styles.container}>
          <label htmlFor="projectName">Project name:</label>
          <input
            id="name"
            name="name"
            placeholder="Project name"
            value={projectBody.name}
            onChange={onChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            placeholder="Last description"
            value={projectBody.description}
            onChange={onChange}
          />
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Start Date"
            value={projectBody.startDate}
            onChange={onChange}
          />
          <label htmlFor="endDAte">End Date:</label>
          <input
            type="date"
            id="endDAte"
            name="endDAte"
            placeholder="End Date"
            value={projectBody.endDate}
            onChange={onChange}
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
            onChange={onChange}
          />
          <div>
            <h3>Employees:</h3>
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
      <Form>
        <Input title={'ProjectName'} />
        <Input title={'Description'} />
        <Input title={'Start Date'} />
        <Input title={'End Date'} />
        <Select
          title={'Active'}
          arrayToMap={[projectBody.active]}
          id="active"
          onChange={onChange}
        />
        <Input title={'Client'} />
        <div>
          <h3>Employees:</h3>
          <Select
            arrayToMap={allEmployees.map((employee) => ({
              id: employee._id,
              label: employee.name + ' ' + employee.lastName
            }))}
          />
          <Select
            arrayToMap={roles.map((rol) => ({
              id: rol,
              label: rol
            }))}
          />
        </div>
        <div>
          <Input placeholder={'Rate'} type={'number'} />
          <Button label={'Assign'} onClick={assingEmployee} />
          <Button label={'Add'} />
          <Button label={'Cancel'} />
        </div>
      </Form>
    </>
  );
};

export default ProjectsForm;
