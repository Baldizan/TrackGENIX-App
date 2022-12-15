import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import styles from './profile.module.css';
import { putEmployee } from 'redux/Employees/thunks';
import { fetchUser } from 'redux/Auth/thunks';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const { user, authenticated } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');
  const { isPending } = useSelector((state) => state.employees);
  const [isModal, setIsModal] = useState(false);
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
    if (!user.email) {
      dispatch(fetchUser(authenticated.role, authenticated.email, token));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const EmployeeProfile = {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone?.toString(),
        email: user.email,
        password: user.password,
        repeatPassword: user.repeatPassword
      };
      reset(EmployeeProfile);
    }
  }, [user]);

  const onSubmit = (data) => {
    dispatch(putEmployee(data._id, data));
    setIsModal(true);
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
            error={errors.email?.message}
          />
          <Input
            placeholder="Edit your password"
            id="password"
            name="password"
            title="Password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <Input
            placeholder="Repeat password"
            id="repeatPassword"
            name="repeatPassword"
            title="Repeat password"
            type="password"
            register={register}
            error={errors.repeatPassword?.message}
          />
        </Form>
      )}
      {isModal && (
        <Modal heading="user edited successfully" theme="success" setModalDisplay={setIsModal} />
      )}
    </section>
  );
};

export default EmployeeProfile;
