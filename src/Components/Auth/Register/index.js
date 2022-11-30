import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useSelector, useDispatch } from 'react-redux';
import { postEmployee } from 'redux/Employees/thunks.js';
import styles from './register.module.css';
import { schema } from './validations';
import Form from 'Components/Shared/Form/index';
import { Input } from 'Components/Shared/Input/index';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.employees);
  const [isModal, setIsModal] = useState(false);
  const [modalContent, setModalContent] = useState({ name: '', lastName: '' });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(postEmployee(data));
    setModalContent({ name: data.name, lastName: data.lastName });
    setIsModal(true);
  };

  const handleCloseModal = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/login`);
    } else {
      setIsModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {!isPending ? (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Register"
          secondColumnIndex={3}
          noValidate={!isValid}
          legend={['Personal information', 'Authentication information']}
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
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            title="Password confirmation"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword?.message}
            required
          />
        </Form>
      ) : null}
      {isPending && <Loader />}
      {!isPending && isModal && (
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

export default Register;
