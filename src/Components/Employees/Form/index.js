import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useSelector, useDispatch } from 'react-redux';
import { postEmployee, putEmployee } from 'redux/Employees/thunks.js';
import { getProjects } from 'redux/Projects/thunks.js';
import styles from './form.module.css';
import { schema } from './validations';
import Form from 'Components/Shared/Form/index';
import { Input, Select } from 'Components/Shared/Input/index';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const EmployeesForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedEmployee] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.employees);
  const { list: projectsList } = useSelector((state) => state.projects);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', lastName: '' });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });
  useEffect(() => {
    dispatch(getProjects());
    selectedEmployee &&
      reset({
        name: selectedEmployee?.name,
        lastName: selectedEmployee?.lastName,
        phone: selectedEmployee?.phone,
        email: selectedEmployee?.email,
        password: selectedEmployee?.password,
        project: selectedEmployee?.project,
        active: selectedEmployee?.active
      });
  }, []);

  const onSubmit = (data) => {
    if (selectedEmployee) {
      dispatch(putEmployee(selectedEmployee._id, data));
      setFeedback({ name: data.name, lastName: data.lastName });
      setModalDisplay(true);
    } else {
      dispatch(postEmployee(data));
      setFeedback({ name: data.name, lastName: data.lastName });
      setModalDisplay(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
      setModalDisplay(false);
      history.push(`/employees`);
    } else {
      setModalDisplay(false);
    }
  };

  return (
    <section className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        title={selectedEmployee ? 'Edit employee' : 'Add employee'}
        secondColumnIndex={3}
        noValidate={!isValid}
      >
        <Input
          id="name"
          name="name"
          title="First Name"
          placeholder="Name"
          register={register}
          error={errors.name?.message}
          required
        />
        <Input
          id="lastName"
          name="lastName"
          title="Last Name"
          placeholder="Last name"
          register={register}
          error={errors.lastName?.message}
          required
        />
        <Input
          id="phone"
          name="phone"
          title="Phone Number"
          placeholder="Phone number"
          register={register}
          error={errors.phone?.message}
          required
        />
        <Input
          id="email"
          name="email"
          title="Email address"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          title="Password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
          required
        />
        <Select
          name="project"
          title="Project"
          placeholder="Select project"
          arrayToMap={projectsList.map((project) => ({
            id: project._id,
            label: project.name
          }))}
          register={register}
          error={errors.project?.message}
          required
        />
        {selectedEmployee ? (
          <Select
            name="active"
            title="Active"
            placeholder="Select status"
            arrayToMap={[
              { id: true, label: 'Active' },
              { id: false, label: 'Inactive' }
            ]}
            register={register}
            error={errors.active?.message}
            required
          />
        ) : null}
      </Form>
      {isPending && <Loader />}
      {modalDisplay && (
        <Modal
          heading={
            error ? error : `Employee ${feedback.name} ${feedback.lastName} successfully submitted!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default EmployeesForm;
