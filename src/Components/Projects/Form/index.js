import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from 'Components/Shared/Form';
import Button from 'Components/Shared/Button';
import { Input, Select } from 'Components/Shared/Input';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import { getEmployees } from 'redux/Employees/thunks';
import { postProject, putProject } from 'redux/Projects/thunks';

const ProjectsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.projects);
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
    active: false,
    employees: []
  });
  const [feedbackModal, setFeedbackModal] = useState(false);
  const roles = ['DEV', 'TL', 'QA', 'PM'];
  const statusProject = ['Active', 'Inactive'];

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          setProject({
            name: res.data?.name,
            description: res.data?.description,
            startDate: res.data?.startDate.slice(0, 10),
            endDate: res.data?.endDate.slice(0, 10),
            clientName: res.data?.clientName,
            active: res.data?.active,
            employees: res.data?.employees
              .filter((e) => e.id && typeof e.id == 'object')
              .map((e) => ({ id: e.id._id, role: e.role, rate: e.rate }))
          });
        });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (projectId) {
      dispatch(putProject(projectId, project));
      setFeedbackModal(true);
    } else {
      dispatch(postProject(project));
      setFeedbackModal(true);
    }
  };

  const handleModalClose = () => {
    if (!error) {
      setFeedbackModal(false);
      history.push(`/projects`);
    } else {
      setFeedbackModal(false);
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

  const removeEmployee = (row) => {
    const newEmployeesArray = project.employees.filter((e) => e !== row);
    setProject({ ...project, employees: newEmployeesArray });
  };

  return (
    <section className={styles.container}>
      {isPending && <p>Loading...</p>}
      <Form
        title={projectId ? 'Edit project' : 'Add project'}
        onSubmit={onSubmit}
        secondColumnIndex={6}
      >
        <Input
          title="Project Name"
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
        <Select
          title="Status"
          name="active"
          value={project.active}
          arrayToMap={statusProject.map((status) => ({
            id: status === 'Active',
            label: status
          }))}
          placeholder={projectId ? 'Select status' : 'Inactive'}
          id="active"
          onChange={onChange}
          disabled={!projectId}
          required={projectId}
        />
        <div className={`${styles.tableContainer} ${styles.employeesContainer}`}>
          <Table
            headers={{ id: 'Employee ID', role: 'Role', rate: 'Rate' }}
            data={project?.employees}
            deleteItem={removeEmployee}
          />
        </div>
        <Select
          title="Employee"
          name="name"
          value={employee.id}
          placeholder="Name"
          arrayToMap={employees.map((employee) => ({
            id: employee._id,
            label: employee.name + ' ' + employee.lastName
          }))}
          onChange={handleChangeEmployee}
          required={!projectId}
        />
        <Select
          title="Role"
          name="role"
          value={employee.role}
          placeholder="Role"
          arrayToMap={roles.map((rol) => ({
            id: rol,
            label: rol
          }))}
          onChange={onChangeEmployee}
          required={!projectId}
        />
        <div className={styles.btnContainer}>
          <Input
            title="Rate"
            name="rate"
            value={employee.rate}
            placeholder="Rate"
            type="number"
            onChange={onChangeEmployee}
            required={!projectId}
          />

          <Button
            theme="secondary"
            style={styles.btnAssign}
            label="Assign"
            onClick={assignEmployee}
          />
        </div>
      </Form>
      {feedbackModal ? (
        <Modal
          setModalDisplay={handleModalClose}
          heading={projectId ? (error ? error : 'Project edited') : error ? error : 'Project added'}
          theme={error ? 'error' : 'success'}
        ></Modal>
      ) : null}
    </section>
  );
};

export default ProjectsForm;
