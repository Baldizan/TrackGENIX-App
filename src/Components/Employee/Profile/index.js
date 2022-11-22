import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import styles from './profile.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { putEmployee } from 'redux/Employees/thunks';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const EmployeeId = '636e639dfb8b4c835d213750';
  const EmployeeProfile = {
    name: 'Pedro',
    lastName: 'Diazz',
    phone: 1231231230,
    mail: 'test@radium.com',
    password: '2022BaSP'
  };

  const { handleSubmit, register, reset } = useForm({
    mode: 'all'
  });

  useEffect(() => {
    if (EmployeeProfile) {
      reset(EmployeeProfile);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(putEmployee(EmployeeId, data));
  };

  return (
    <section className={styles.container}>
      <Form title="My profile" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Edit your name"
          id="name"
          name="name"
          title="Name"
          register={register}
        />
        <Input
          placeholder="Edit your last name"
          id="lastName"
          name="lastName"
          title="User name"
          register={register}
        />
        <Input
          placeholder="Edit your phone"
          id="phone"
          name="phone"
          title="Phone"
          register={register}
        />
        <Input
          placeholder="Edit your email"
          id="mail"
          name="mail"
          title="Mail"
          register={register}
        />
        <Input
          placeholder="Edit your password"
          id="password"
          name="password"
          title="Password"
          type="password"
          register={register}
        />
        <Input
          placeholder="Repeat password"
          id="repeatPassword"
          name="repeatPassword"
          title="Repeat password"
          type="password"
          register={register}
        />
      </Form>
    </section>
  );
};

export default EmployeeProfile;
