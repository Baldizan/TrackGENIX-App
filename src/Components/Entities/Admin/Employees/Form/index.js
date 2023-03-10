import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useSelector, useDispatch } from 'react-redux';
import { putEmployee } from 'redux/Employees/thunks.js';
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
  const [isModal, setIsModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const [modalContent, setModalContent] = useState({ name: '', lastName: '' });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });
  useEffect(() => {
    dispatch(getProjects(token));
    selectedEmployee &&
      reset({
        name: selectedEmployee?.name,
        lastName: selectedEmployee?.lastName,
        phone: selectedEmployee?.phone?.toString(),
        email: selectedEmployee?.email,
        password: selectedEmployee?.password,
        active: selectedEmployee?.active
      });
  }, []);

  const onSubmit = (data) => {
    if (selectedEmployee) {
      dispatch(putEmployee(selectedEmployee._id, data, token));
      setModalContent({ name: data.name, lastName: data.lastName });
      setIsModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/admin/employees`);
    } else {
      setIsModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {!isPending ? (
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
            type="number"
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
      ) : null}
      {isPending && <Loader />}
      {isModal && (
        <Modal
          heading={
            error
              ? error
              : `Employee ${modalContent.name} ${modalContent.lastName} successfully submitted!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default EmployeesForm;
