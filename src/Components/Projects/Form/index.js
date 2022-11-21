import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import Button from 'Components/Shared/Button';
import { Input, Select } from 'Components/Shared/Input';
import Form from 'Components/Shared/Form';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import { getEmployees } from 'redux/Employees/thunks';
import { postProject, putProject } from 'redux/Projects/thunks';
import styles from './form.module.css';

const ProjectsForm = () => {
  const history = useHistory();
  const projectId = history.location.state?.id;
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.projects);
  const [displayForm, setDisplayForm] = useState(false);
  const { list: employees, error } = useSelector((state) => state.employees);
  const [feedbackModal, setFeedbackModal] = useState(false);
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
  console.log('errors', errors);

  const { fields, update, remove, prepend } = useFieldArray({
    control,
    name: 'employees'
  });

  useEffect(() => {
    dispatch(getEmployees());
    if (projectId) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          const MOCK_DATA = {
            name: res.data?.name,
            description: res.data?.description,
            startDate: res.data?.startDate,
            endDate: res.data?.endDate,
            clientName: res.data?.clientName,
            active: res.data?.active,
            employees: res.data?.employees
              ?.filter((e) => e.id && typeof e.id == 'object')
              .map((e) => ({
                employeeId: e.id._id,
                role: e.role,
                rate: e.rate
              }))
          };
          reset(MOCK_DATA);
        });
    }
  }, []);

  const onSubmit = (data) => {
    if (projectId) {
      data.employees = data.employees.map((e) => ({
        ...e,
        id: e.employeeId,
        employeeId: undefined
      }));
      dispatch(putProject(projectId, data));
      setFeedbackModal(true);
    } else {
      dispatch(postProject(data));
      setFeedbackModal(true);
    }
    console.log('data form: ', data);
  };

  const handleModalClose = () => {
    if (!error) {
      setFeedbackModal(false);
      history.push(`/projects`);
    } else {
      setFeedbackModal(error);
    }
  };

  const assignEmployee = () => {
    update();
    setDisplayForm(false);
  };

  const handleAddEmployee = () => {
    setDisplayForm(true);
    prepend();
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      <Form
        title={projectId ? 'Edit project' : 'Add project'}
        onSubmit={handleSubmit(onSubmit)}
        secondColumnIndex={6}
      >
        <Input
          register={register}
          title="Project Name"
          id="ProjectName"
          name="name"
          error={errors.name?.message}
        />
        <Input
          register={register}
          title="Client"
          id="client"
          name="clientName"
          error={errors.clientName?.message}
        />
        <Input
          register={register}
          title="Description"
          id="description"
          name="description"
          error={errors.description?.message}
        />
        <Input
          register={register}
          title="Start Date"
          name="startDate"
          type="date"
          error={errors.startDate?.message}
        />
        <Input
          register={register}
          title="End Date"
          name="endDate"
          type="date"
          error={errors.startDate?.message}
        />
        <Select
          title="Status"
          name="active"
          arrayToMap={statusProject.map((status) => ({
            id: status === 'Active',
            label: status
          }))}
          id="active"
          error={errors.active?.message}
          register={register}
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
              name={`employees[0].employeeId`}
              placeholder="Name"
              arrayToMap={
                employees.map((employee) => ({
                  id: employee._id,
                  label: employee.name + ' ' + employee.lastName
                })) ?? []
              }
              register={register}
            />
            <Select
              title="Role"
              name={`employees[0].role`}
              placeholder="Role"
              arrayToMap={roles.map((rol) => ({
                id: rol,
                label: rol
              }))}
              register={register}
            />
            <div className={styles.btnContainer}>
              <Input
                title="Rate"
                name={`employees[0].rate`}
                placeholder="Rate"
                type="number"
                register={register}
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
      {feedbackModal && (
        <Modal
          setModalDisplay={handleModalClose}
          heading={projectId ? 'Project edited' : 'Project added'}
          theme={error ? 'error' : 'success'}
        ></Modal>
      )}
    </section>
  );
};

export default ProjectsForm;
