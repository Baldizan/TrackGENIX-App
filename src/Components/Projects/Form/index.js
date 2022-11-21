import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from 'Components/Shared/Form';
import { useForm, useFieldArray } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import Button from 'Components/Shared/Button';
import { Input, Select } from 'Components/Shared/Input';
import Table from 'Components/Shared/Table';
// import Modal from 'Components/Shared/Modal';
import { getEmployees } from 'redux/Employees/thunks';
// import { postProject, putProject } from 'redux/Projects/thunks';

const ProjectsForm = () => {
  const history = useHistory();
  const projectId = history.location.state.id;
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.projects);
  // const { employees, setEmployees } = useState;
  const [displayForm, setDisplayForm] = useState(false);
  const { list: employees } = useSelector((state) => state.employees);
  // const [employee, setEmployee] = useState({
  //   id: '',
  //   role: '',
  //   rate: ''
  // });
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: false,
    employees: []
  });
  // const [feedbackModal, setFeedbackModal] = useState(false);
  const roles = ['DEV', 'TL', 'QA', 'PM'];
  const statusProject = ['Active', 'Inactive'];
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const { fields, update, remove, prepend } = useFieldArray({
    control,
    name: 'employees'
  });
  //

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          const MOCK_DATA = {
            name: res.data?.name,
            description: res.data?.description,
            startDate: res.data?.startDate?.slice(0, 10),
            endDate: res.data?.endDate?.slice(0, 10),
            clientName: res.data?.clientName,
            active: res.data?.active,
            employees: res.data?.employees
              ?.filter((e) => e.id && typeof e.id == 'object')
              .map((e) => ({
                employeeId: e.id._id,
                //  name: e.id.name,
                role: e.role,
                rate: e.rate
              }))
          };
          reset(MOCK_DATA);
          setProject(MOCK_DATA);
        });
    }
  }, []);

  console.log(errors);
  const onSubmit = (data) => {
    // e.preventDefault();
    // if (projectId) {
    //   dispatch(putProject(projectId, project));
    //   setFeedbackModal(true);
    // } else {
    //   dispatch(postProject(project));
    //   setFeedbackModal(true);
    // }
    console.log('data form: ', data);
  };

  // const handleModalClose = () => {
  //   if (!error) {
  //     setFeedbackModal(false);
  //     history.push(`/projects`);
  //   } else {
  //     setFeedbackModal(false);
  //   }
  // };

  // const onChange = (e) => {
  //   setProject({ ...project, [e.target.name]: e.target.value });
  // };

  // const onChangeEmployee = (e) => {
  //   setEmployee({ ...employee, [e.target.name]: e.target.value });
  // };

  // const handleChangeEmployee = (e) => {
  //   setEmployee({ ...employee, id: e.target.value });
  // };

  const assignEmployee = () => {
    // const newProject = { ...project };
    // newProject.employees?.push(employee);
    // setProject(newProject);
    // console.log('hola', { ...fields[0], name: 'hjgjgj' });
    update();
    setDisplayForm(false);
  };

  // const removeEmployee = (row) => {
  //   // const newEmployeesArray = project.employees.filter((e) => e !== row);
  //   // setProject({ ...project, employees: newEmployeesArray });
  // };
  const handleAddEmployee = () => {
    setDisplayForm(true);
    prepend();
  };
  console.log('fields:', fields);
  console.log('fields.len:', fields.length);
  return (
    <section className={styles.container}>
      {isPending && <p>Loading...</p>}
      <Form
        title={projectId ? 'Edit project' : 'Add project'}
        onSubmit={handleSubmit(onSubmit)}
        secondColumnIndex={6}
      >
        <Input
          register={register}
          title="Project Name"
          id="ProjectName"
          // value={project.name}
          name="name"
          // onChange={onChange}
          error={errors.name?.message}
          // required
        />
        <Input
          register={register}
          title="Client"
          id="client"
          // value={project.clientName}
          name="clientName"
          // onChange={onChange}
          error={errors.clientName?.message}
          // required
        />
        <Input
          register={register}
          title="Description"
          id="description"
          // value={project.description}
          name="description"
          // onChange={onChange}
          error={errors.description?.message}
          // required
        />
        <Input
          register={register}
          title="Start Date"
          // value={project.startDate}
          name="startDate"
          type="date"
          // onChange={onChange}
          error={errors.startDate?.message}
          // required
        />
        <Input
          register={register}
          title="End Date"
          // value={project.endDate}
          name="endDate"
          type="date"
          // onChange={onChange}
          error={errors.startDate?.message}
          // required
        />
        <Select
          title="Status"
          name="active"
          // value={project.active}
          arrayToMap={statusProject.map((status) => ({
            id: status === 'Active',
            label: status
          }))}
          // placeholder={projectId ? 'Select status' : 'Inactive'}
          id="active"
          error={errors.active?.message}
          register={register}
          // onChange={onChange}
          // disabled={!projectId}
          // required={projectId}
        />
        <div className={`${styles.tableContainer} ${styles.employeesContainer}`}>
          <Table
            headers={{ name: 'Employee', role: 'Role', rate: 'Rate' }}
            data={
              fields?.map((f) => ({
                ...f,
                name: employees.find((e) => e._id === f.employeeId)?.name
              })) ?? []
            }
            deleteItem={({ id }) => remove(fields.findIndex((f) => f.id === id))}
          />
        </div>
        {!displayForm && (
          <Button
            theme="secondary"
            style={styles.btnAssign}
            label="Add new employee"
            onClick={handleAddEmployee}
          />
        )}
        {displayForm && (
          <>
            <Select
              title="Employee"
              // value={employees[0].id}
              name={`employees[0].employeeId`}
              placeholder="Name"
              arrayToMap={
                employees.map((employee) => ({
                  id: employee._id,
                  label: employee.name + ' ' + employee.lastName
                })) ?? []
              }
              // onChange={handleChangeEmployee}
              register={register}
              required={!project}
            />
            <Select
              title="Role"
              name={`employees[0].role`}
              // ${fields.length}
              // value={employee.role}
              placeholder="Role"
              arrayToMap={roles.map((rol) => ({
                id: rol,
                label: rol
              }))}
              register={register}
              // onChange={onChangeEmployee}
              // required={!projectId}
            />
            <div className={styles.btnContainer}>
              <Input
                title="Rate"
                name={`employees[0].rate`}
                // value={employee.rate}
                placeholder="Rate"
                type="number"
                register={register}
                // onChange={onChangeEmployee}
                // required={!projectId}
              />

              <Button
                theme="secondary"
                style={styles.btnAssign}
                label="Assign"
                onClick={assignEmployee}
              />
            </div>
          </>
        )}
      </Form>
      {/* {feedbackModal ? (
        <Modal
          setModalDisplay={handleModalClose}
          heading={project ? (error ? error : 'Project edited') : error ? error : 'Project added'}
          theme={error ? 'error' : 'success'}
        ></Modal>
      ) : null} */}
    </section>
  );
};

export default ProjectsForm;
