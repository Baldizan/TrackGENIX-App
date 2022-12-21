import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getEmployees } from 'redux/Employees/thunks';
import { postProject, putProject } from 'redux/Projects/thunks';
import styles from './form.module.css';
import { schema } from './validations';
import Button from 'Components/Shared/Button';
import { Input, Select } from 'Components/Shared/Input';
import Form from 'Components/Shared/Form';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const ProjectsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectId = history.location.state?.id;
  const project = history.location.state?.project;
  const [displayForm, setDisplayForm] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const { isPending } = useSelector((state) => state.projects);
  const token = sessionStorage.getItem('token');
  const { list: employees, error } = useSelector((state) => state.employees);
  const roles = ['DEV', 'TL', 'QA'];
  const statusProject = ['Active', 'Inactive'];
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });
  const { fields, update, remove, append } = useFieldArray({
    control,
    name: 'employees'
  });

  const employeePM = watch('projectManager');
  const employeesSelected = watch('employees');

  const employeesIds =
    employeesSelected?.map((e) => {
      return e.employeeId;
    }) ?? [];

  const [listForPM, setListForPM] = useState();
  const [listForEmployees, setlistForEmployees] = useState();
  console.log(employeePM);
  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  useEffect(() => {
    setlistForEmployees(employees);
    setListForPM(employees);
  }, [employees]);

  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [employees]);

  const handleModalClose = () => {
    if (!error) {
      setFeedbackModal(false);
      history.push('/admin/projects');
    } else {
      setFeedbackModal(error);
    }
  };

  const assignEmployee = () => {
    update();
    setDisplayForm(false);
  };

  const handleAdd = () => {
    setDisplayForm(true);
    append({ employeeId: null, role: null, rate: 1 });
  };

  const deleteProject = (item) => {
    remove(fields.findIndex((field) => item.id === field.id));
  };

  const onSubmit = (data) => {
    data.employees = data.employees?.map((e) => ({
      ...e,
      id: e.employeeId,
      employeeId: undefined
    }));
    console.log('data', data);
    if (project) {
      dispatch(putProject(projectId, data, token));
      setFeedbackModal(true);
    } else {
      dispatch(postProject(data, token));
      setFeedbackModal(true);
    }
  };

  useEffect(() => {
    const employeesFilterPM = employees
      .filter((e) => {
        return e._id !== employeePM;
      })
      .filter((item) => {
        return !employeesIds.includes(item._id);
      });
    setListForPM(employeesFilterPM);
  }, [employees, employeePM, employeesSelected]);

  useEffect(() => {
    const employeesFilter = employees.filter((item) => {
      return !employeesIds.includes(item._id);
    });
    setlistForEmployees(employeesFilter);
  }, [employeesSelected]);
  console.log(fields);
  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && (
        <Form
          title={project ? 'Edit project' : 'Add project'}
          onSubmit={handleSubmit(onSubmit)}
          secondColumnIndex={6}
        >
          <Input
            register={register}
            title="Project Name"
            id="ProjectName"
            name="name"
            placeholder="Project Name"
            error={errors.name?.message}
          />
          <Input
            register={register}
            title="Client"
            id="client"
            name="clientName"
            placeholder="Client name"
            error={errors.clientName?.message}
          />
          <Input
            register={register}
            title="Description"
            id="description"
            name="description"
            placeholder="Description"
            error={errors.description?.message}
          />
          <Input
            register={register}
            title="Start Date"
            name="startDate"
            type="date"
            placeholder="Start Date"
            error={errors.startDate?.message}
          />
          <Input
            register={register}
            title="End Date"
            name="endDate"
            type="date"
            placeholder="End Date"
            error={errors.endDate?.message}
          />
          <Select
            title="Status"
            name="active"
            arrayToMap={statusProject.map((status) => ({
              id: status === 'Active',
              label: status
            }))}
            id="active"
            register={register}
            error={errors.active?.message}
          />
          <Select
            title="Project manager"
            name="projectManager"
            placeholder="Select Project manager"
            arrayToMap={listForEmployees?.map((employee) => ({
              id: employee._id,
              label: employee.name + ' ' + employee.lastName
            }))}
            id="projectManager"
            register={register}
            error={errors.projectManager?.message}
          />
          <div className={`${styles.tableContainer} ${styles.employeesContainer}`}>
            <Table
              headers={{ name: 'Employee', role: 'Role', rate: 'Rate' }}
              data={
                fields
                  ?.map((field) => ({
                    ...field,
                    name:
                      employees?.find((e) => e._id === field.employeeId)?.name +
                      ' ' +
                      employees?.find((e) => e._id === field.employeeId)?.lastName
                  }))
                  ?.filter((field) => field.employeeId) ?? []
              }
              deleteItem={deleteProject}
            />
          </div>
          {!displayForm && (
            <Button
              theme="secondary"
              style={styles.btnAdd}
              label="Add new employee"
              onClick={handleAdd}
            />
          )}
          {displayForm && (
            <>
              <Select
                title="Employee"
                name={`employees[${fields.length - 1}].employeeId`}
                placeholder="Select employee"
                arrayToMap={listForPM?.map((employee) => ({
                  id: employee._id,
                  label: employee.name + ' ' + employee.lastName
                }))}
                error={
                  errors.employees ? errors.employees[fields.length - 1]?.employeeId?.message : ''
                }
                register={register}
              />
              <Select
                title="Role"
                name={`employees[${fields.length - 1}].role`}
                placeholder={'Role'}
                arrayToMap={roles.map((rol) => ({
                  id: rol,
                  label: rol
                }))}
                register={register}
                error={errors.employees ? errors.employees[fields.length - 1].role?.message : ''}
              />
              <div className={styles.btnContainer}>
                <Input
                  title="Rate"
                  name={`employees[${fields.length - 1}].rate`}
                  placeholder="Rate"
                  type="number"
                  register={register}
                  error={errors.employees ? errors.employees[fields.length - 1].rate?.message : ''}
                />

                <Button
                  theme="secondary"
                  style={styles.btnAssign}
                  label="Assign"
                  onClick={assignEmployee}
                  disabled={errors.employees}
                />
              </div>
            </>
          )}
        </Form>
      )}
      {feedbackModal && (
        <Modal
          setModalDisplay={handleModalClose}
          heading={error ? 'There was an error!' : 'Success!'}
          message={`The project ${project ? `"${project.name}"` : null} was successfully ${
            project ? 'edited' : 'submitted'
          }.`}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default ProjectsForm;
