import React, { useState } from 'react';
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
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.auth);
  const [isModal, setIsModal] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (inputData) => {
    if (isValid) {
      const user = await dispatch(login(inputData));
      if (user.error) {
        setIsModal(true);
      }
      if (user.role) {
        switch (user.role) {
          case 'SUPERADMIN':
            return history.push('/super-admin');
          case 'ADMIN':
            return history.push('/admin');
          case 'EMPLOYEE':
            return history.push('/employee');
        }
      }
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && (
        <div className={styles.loginContainer}>
          <img
            className={styles.loginImage}
            src={`${process.env.PUBLIC_URL}/assets/images/login-image.png`}
          />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            title="Welcome to TrackGENIX!"
            noValidate={!isValid}
            goBack={false}
            style={styles.loginForm}
            customBtnLabel="Log in"
          >
            <h2>Log in entering your credentials below:</h2>
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
        </div>
      )}
      {!isPending && isModal ? (
        <Modal heading="Inactive account" theme="confirm" setModalDisplay={setIsModal}>
          <div className={styles.errorModal}>
            <p>Please contact your system administrator.</p>
            <Button label="Dismiss" onClick={() => setIsModal(false)}></Button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
};
export default Login;
