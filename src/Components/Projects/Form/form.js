import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
import { Input, Select } from '../../Shared/Input/index';

const ProjectsForm = () => {
  let history = useHistory();
  const projectId = history.location.state?.id;
  const [employees, setEmployees] = useState([]);
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
  const roles = ['Rol', 'DEV', 'TL', 'QA', 'PM'];
  const statusProject = ['Active', 'Inactive'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((res) => setEmployees(res.data));
  }, []);

  useEffect(() => {
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          setProject({
            name: res.data.name,
            description: res.data.description,
            startDate: res.data.startDate.substring(0, 10),
            endDate: res.data.endDate.substring(0, 10),
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
    var today = new Date(d);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
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
      }).then(() => {
        alert(`Project ${project.name} created successfully!`);
        history.push('/projects');
      });
    }
  };

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    setEmployee({ ...employee, id: e.target.value });
  };

  const handleChangeRole = (e) => {
    setEmployee({ ...employee, role: e.target.value });
  };

  const handleChangeRate = (e) => {
    setEmployee({ ...employee, rate: +e.target.value });
  };

  const assignEmployee = () => {
    const newProject = { ...project };
    newProject.employees.push(employee);
    setProject(newProject);
  };

  const getName = (id) => {
    let employee = employees.find(function (e) {
      return e._id == id;
    });
    return employee?.name;
  };

  return (
    <>
      <Form onSubmit={updateProject}>
        <Input
          title={'ProjectName'}
          id="ProjectName"
          value={project.name}
          name="name"
          onChange={onChange}
        />
        <Input
          title={'Client'}
          id="client"
          value={project.clientName}
          name="clientName"
          onChange={onChange}
        />
        <Input
          title={'Description'}
          id="description"
          value={project.description}
          name="description"
          onChange={onChange}
        />
        <Input
          title={'Start Date'}
          value={project.startDate}
          name="startDate"
          type="date"
          onChange={onChange}
        />
        <Input
          title={'End Date'}
          value={project.endDate}
          name="endDate"
          type="date"
          onChange={onChange}
        />
        <Select
          title={'Active'}
          name={'active'}
          value={project.active}
          arrayToMap={statusProject.map((status) => ({
            id: status == 'Active',
            label: status
          }))}
          id="active"
          onChange={onChange}
        />
        <div>
          <div>
            {project?.employees?.map((e, i) => (
              <div key={i}>
                <span>{e.id}</span>
                <span>{getName(e.id)}</span>
              </div>
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
