import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
import { Input, Select } from '../../Shared/Input/index';
import Table from '../../Shared/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../../redux/Employees/thunks';

const ProjectsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: employees } = useSelector((state) => state.employees);
  const projectId = history.location.state?.id;
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
    active: '',
    employees: []
  });
  const roles = ['DEV', 'TL', 'QA', 'PM'];
  const statusProject = ['Active', 'Inactive'];

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          setProject({
            name: res.data.name,
            description: res.data.description,
            startDate: res.data.startDate.slice(0, 10),
            endDate: res.data.endDate.slice(0, 10),
            clientName: res.data.clientName,
            active: res.data.active,
            employees: res.data.employees
              .filter((e) => e.id && typeof e.id == 'object')
              .map((e) => ({ id: e.id._id, role: e.role, rate: e.rate }))
          });
        });
    }
  }, []);

  const format = (d) => {
    const today = new Date(d);
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  };

  const updateProject = (e) => {
    e.preventDefault();
    project.startDate = format(project.startDate);
    project.endDate = format(project.endDate);
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      }).then(() => {
        alert(`Project ${project.name} updated successfully!`);
        history.push('/projects');
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
        .then((json) => {
          if (json.error) {
            alert(json.message);
          } else {
            history.push('/projects');
          }
        });
    }
  };

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onChangeEmployee = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    setEmployee({ ...employee, id: e.target.value });
  };

  const assignEmployee = () => {
    const newProject = { ...project };
    newProject.employees?.push(employee);
    setProject(newProject);
  };

  return (
    <section className={styles.container}>
      <Form onSubmit={updateProject} secondColumnIndex={6}>
        <Input
          title="ProjectName"
          id="ProjectName"
          value={project.name}
          name="name"
          onChange={onChange}
          required
        />
        <Input
          title="Client"
          id="client"
          value={project.clientName}
          name="clientName"
          onChange={onChange}
          required
        />
        <Input
          title="Description"
          id="description"
          value={project.description}
          name="description"
          onChange={onChange}
          required
        />
        <Input
          title="Start Date"
          value={project.startDate}
          name="startDate"
          type="date"
          onChange={onChange}
          required
        />
        <Input
          title="End Date"
          value={project.endDate}
          name="endDate"
          type="date"
          onChange={onChange}
          required
        />
        {projectId ? (
          <Select
            title="Active"
            name="active"
            value={project.active}
            arrayToMap={statusProject.map((status) => ({
              id: status === 'Active',
              label: status
            }))}
            placeholder="Status"
            id="active"
            onChange={onChange}
            required
          />
        ) : null}
        <div className={`${styles.tableContainer} ${styles.employeesContainer}`}>
          <Table headers={{ id: 'name', role: 'role', rate: 'rate' }} data={project?.employees} />
        </div>
        <Select
          title="test"
          name="name"
          value={employee.id}
          placeholder="Name"
          arrayToMap={employees.map((employee) => ({
            id: employee._id,
            label: employee.name + ' ' + employee.lastName
          }))}
          onChange={handleChangeEmployee}
          required
        />
        <Select
          title="test"
          name="role"
          value={employee.role}
          placeholder="Role"
          arrayToMap={roles.map((rol) => ({
            id: rol,
            label: rol
          }))}
          onChange={onChangeEmployee}
          required
        />
        <div className={styles.btnContainer}>
          <Input
            title="test"
            name="rate"
            value={employee.rate}
            placeholder="Rate"
            type="number"
            onChange={onChangeEmployee}
            required
          />

          <Button
            theme="secondary"
            style={styles.btnAssign}
            label="Assign"
            onClick={assignEmployee}
          />
        </div>
      </Form>
    </section>
  );
};

export default ProjectsForm;
