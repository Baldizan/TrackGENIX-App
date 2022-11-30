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
  const { isPending, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const onSubmit = (inputData) => {
    if (isValid) {
      dispatch(login(inputData));
      history.push('/employee');
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Welcome to TrackGENIX!"
          noValidate={!isValid}
          legend="To log in, please enter your credentials below:"
        >
          <Input
            error={errors.email?.message}
            register={register}
            name="email"
            title="Email Address"
            type="text"
            placeholder="email@address.com"
            required
          />
          <Input
            error={errors.password?.message}
            register={register}
            name="password"
            type="password"
            title="Password"
            placeholder="Enter your password"
            required
          />
          <p className={styles.error}>{error ? 'Check your credentials' : ''}</p>
        </Form>
      )}
    </section>
  );
};
export default Login;
