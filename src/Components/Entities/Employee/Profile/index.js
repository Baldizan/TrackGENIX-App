import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import { schemaPass } from './validationsPass';
import styles from './profile.module.css';
import { getEmployees, putEmployee } from 'redux/Employees/thunks';
import { fetchUser } from 'redux/Auth/thunks';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const { user, authenticated, isPending } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');
  const [isModal, setIsModal] = useState(false);
  const [formPass, setFormPass] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });
  const {
    handleSubmit: handleSubmitPass,
    register: registerPass,
    formState: { errors: errorPass, isValid: isValidPass }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(schemaPass)
  });

  useEffect(() => {
    if (!user.email) {
      dispatch(fetchUser(authenticated.role, authenticated.email, token));
    }
    dispatch(getEmployees(token));
  }, []);

  useEffect(() => {
    if (user) {
      const EmployeeProfile = {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone?.toString(),
        email: user.email
      };
      reset(EmployeeProfile);
    }
  }, [user]);
  console.log(user);
  const onSubmit = (data) => {
    dispatch(putEmployee(user._id, data, token));
    setIsModal(true);

    const EmployeeProfile = {
      name: user.name,
      lastName: user.lastName,
      phone: user.phone?.toString(),
      email: user.email
    };
    reset(EmployeeProfile);
  };

  const handleAdd = () => {
    setFormPass(true);
  };
  const onSubmitPass = (data) => {
    dispatch(putEmployee(user._id, data, token));
    setIsModal(true);
    setFormPass(false);
  };

  return (
    <section className={styles.container}>
      {!isPending && (
        <Form
          title="My profile"
          onSubmit={handleSubmit(onSubmit)}
          noValidate={!isValid}
          secondColumnIndex={3}
          legend={['Personal information', 'Authentication information']}
          linktoRedirect="/profile"
        >
          <Input
            placeholder="Edit your name"
            id="name"
            name="name"
            title="Name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            placeholder="Edit your last name"
            id="lastName"
            name="lastName"
            title="Last Name"
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            placeholder="Edit your phone"
            id="phone"
            name="phone"
            title="Phone"
            register={register}
            error={errors.phone?.message}
          />
          <Input
            placeholder="Edit your email"
            id="email"
            name="email"
            title="Email"
            register={register}
            disabled
          />
          {!formPass && (
            <Button
              theme="primary"
              style={styles.btnChangePwd}
              label="Change your password"
              onClick={handleAdd}
            />
          )}
        </Form>
      )}
      {isModal && (
        <Modal heading="user edited successfully" theme="success" setModalDisplay={setIsModal} />
      )}
      {formPass && (
        <Modal theme="confirm" setModalDisplay={setFormPass}>
          <Form
            noValidate={!isValidPass}
            hiddenCancel
            onSubmit={handleSubmitPass(onSubmitPass)}
            title="Change your password"
            style={styles.passForm}
            goBack={false}
          >
            <Input
              placeholder="Edit your password"
              id="password"
              name="password"
              title="Password"
              type="password"
              register={registerPass}
              error={errorPass.password?.message}
            />
            <Input
              placeholder="Repeat password"
              id="repeatPassword"
              name="repeatPassword"
              title="Repeat password"
              type="password"
              register={registerPass}
              error={errorPass.repeatPassword?.message}
            />
          </Form>
        </Modal>
      )}
    </section>
  );
};

export default EmployeeProfile;
