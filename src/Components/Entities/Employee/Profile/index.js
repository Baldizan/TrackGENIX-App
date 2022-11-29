import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import styles from './profile.module.css';
import { putEmployee } from 'redux/Employees/thunks';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const EmployeeId = '636e639dfb8b4c835d213750';
  const [isModal, setIsModal] = useState(false);
  const EmployeeProfile = {
    name: 'Pedro',
    lastName: 'Diazz',
    phone: '1234578911',
    email: 'test@radium.com',
    password: '2022BaSP',
    repeatPassword: '2022BaSP'
  };
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
    if (EmployeeProfile) {
      reset(EmployeeProfile);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(putEmployee(EmployeeId, data));
    setIsModal(true);
  };

  return (
    <section className={styles.container}>
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
        {isModal && (
          <Modal heading="user edited successfully" theme="success" setModalDisplay={setIsModal} />
        )}
      </Form>
    </section>
  );
};

export default EmployeeProfile;
