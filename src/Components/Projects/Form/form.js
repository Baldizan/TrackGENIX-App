import { useState, useEffect } from 'react';
//import styles from '../projects.module.css';
//import { useHistory } from 'react-router-dom';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
//import Table from '../../Shared/Table';
import { Input, Select } from '../../Shared/Input/index';

const ProjectsForm = () => {
  // let history = useHistory();
  const paramsURL = new URLSearchParams(window.location.search);
  const projectId = paramsURL.get('id');
  const [employees, setEmployees] = useState([]);
  //const headers = ['employee', 'active', 'rol'];
  // const [selectedEmployee, setSelectedEmployee] = useState();
  // const [selectedRole, setSelectedRole] = useState();
  // const [selectedRate, setSelectedRate] = useState();
  //const [activeValue, changeActiveValue] = useState(false);
  const [employee, setEmployee] = useState({
    id: '',
    role: '',
    rate: ''
  });
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: 'activeValue',
    employees: []
  });

  const roles = ['Rol', 'DEV', 'TL', 'QA', 'PM'];
  const statusProject = ['Active', 'Inactive'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((res) => setEmployees(res.data));
  }, []);

  // useEffect(() => {
  //   if (projectId) {
  //     fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setProject({
  //           name: res.data.name,
  //           description: res.data.description,
  //           startDate: res.data.startDate.substring(0, 10),
  //           endDate: res.data.endDate.substring(0, 10),
  //           clientName: res.data.clientName,
  //           active: res.data.active,
  //           employees: 'employees'
  //         });
  //       });
  //   }
  // }, []);

  const updateProject = () => {
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
        .then((res) => res.json())
        .then(function (res) {
          if (!res.error) {
            alert(`Project ${project.name} updated successfully!`);
            history.push('/projects');
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
        .then((res) => res.json())
        .then(function (res) {
          if (!res.error) {
            alert(`Project ${project.name} created successfully!`);
            history.push('/projects');
          }
        });
    }
  };

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleChangeActive = (e) => {
    //changeActiveValue(e.target.value);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    //setSelectedEmployee(e.target.value);
    setEmployee({ ...employee, id: e.target.value });
  };

  const handleChangeRole = (e) => {
    // setSelectedRole(e.target.value);
    setEmployee({ ...employee, role: e.target.value });
  };

  const handleChangeRate = (e) => {
    // setSelectedRate(e.target.value);
    setEmployee({ ...employee, rate: e.target.value });
  };

  const assignEmployee = () => {
    const newProject = { ...project };
    newProject.employees.push(employee);
    setProject(newProject);
  };

  console.log('empleados', employee);

  const getName = (id) => {
    console.log(id);
    let employee = employees.find(function (e) {
      return e._id == id;
    });
    console.log(employee);
    return employee?.name;
  };

  return (
    <>
      {/* <section className={styles.container}>
        <form className={styles.container}>
          <label htmlFor="projectName">Project name:</label>
          <input
            id="name"
            name="name"
            placeholder="Project name"
            value={project.name}
            onChange={onChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            placeholder="Last description"
            value={project.description}
            onChange={onChange}
          />
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Start Date"
            value={project.startDate}
            onChange={onChange}
          />
          <label htmlFor="endDAte">End Date:</label>
          <input
            type="date"
            id="endDAte"
            name="endDAte"
            placeholder="End Date"
            value={project.endDate}
            onChange={onChange}
          />
          <label htmlFor="status">Active:</label>
          <select name="active" value={project.active} onChange={handleChangeActive}>
            <option value="false">Inactive</option>
            <option value="true">Active</option>
          </select>
          <label htmlFor="client">Client:</label>
          <input
            id="client"
            name="client"
            placeholder="Client"
            value={project.clientName}
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
              {employees.map((employee) => {
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
        <button onClick={updateProject}>Add</button>
        <a href="/projects">
          <button>Cancel</button>
        </a>
      </section> */}
      <Form onSubmit={updateProject}>
        <Input title={'ProjectName'} id="ProjectName" name="ProjectName" onChange={onChange} />
        <Input title={'Client'} id="client" name="client" onChange={onChange} />
        <Input title={'Description'} id="description" name="description" onChange={onChange} />
        <Input title={'Start Date'} type="date" onChange={onChange} />
        <Input title={'End Date'} type="date" onChange={onChange} />
        <Select
          title={'Active'}
          arrayToMap={statusProject.map((status) => ({
            id: status,
            label: status
          }))}
          id="active"
          onChange={handleChangeActive}
        />
        <div>
          <div>
            {project.employees.map((employee, i) => (
              <span key={i}>{getName(employee.id)}</span>
            ))}
          </div>
          <h3>Employees:</h3>
          <Select
            arrayToMap={employees.map((employee) => ({
              id: employee._id,
              label: employee.name + ' ' + employee.lastName
            }))}
            onChange={handleChangeEmployee}
          />
          <Select
            arrayToMap={roles.map((rol) => ({
              id: rol,
              label: rol
            }))}
            onChange={handleChangeRole}
          />
        </div>
        {/* <Table headers={headers} data={employees} /> */}
        <div>
          <Input placeholder={'Rate'} type={'number'} onChange={handleChangeRate} />
          <Button label={'Assign'} onClick={assignEmployee} />
          <Button label={'Cancel'} />
        </div>
      </Form>
    </>
  );
};

export default ProjectsForm;
