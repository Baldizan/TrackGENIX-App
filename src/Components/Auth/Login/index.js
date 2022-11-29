import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { login } from 'redux/Auth/thunks.js';
import styles from './login.module.css';
import { schema } from './validations';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Loader from 'Components/Shared/Loader';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, authenticated, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (inputData) => {
    if (Object.values(errors).length === 0) {
      /*const role =*/ await dispatch(login(inputData));
      if (authenticated.role) {
        switch (authenticated.role) {
          case 'SUPERADMIN':
            history.push('/super-admin');
            break;
          case 'ADMIN':
            history.push('/admin');
            break;
          case 'EMPLOYEE':
            history.push('/employee');
            break;
        }
      }
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)} title="Login" noValidate={!isValid}>
        <Input
          error={errors.description?.message}
          register={register}
          name="email"
          title="Email Address"
          placeholder="email@address.com"
          required
        />
        <Input
          error={errors.description?.message}
          register={register}
          name="password"
          title="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <p className={styles.error}>{error ? 'Check your credentials' : ''}</p>
      </Form>
    </section>
  );
};
export default Login;
