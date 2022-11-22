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
    userName: 'Pedro',
    lastName: 'Diazz',
    phone: 1231231230,
    email: 'test@radium.com',
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
        <Input placeholder="Edit your name" name="name" title="Name" register={register} />
        <Input
          placeholder="Edit your last name"
          name="lastName"
          title="User name"
          register={register}
        />
        <Input placeholder="Edit your phone" name="phone" title="Phone" register={register} />
        <Input placeholder="Edit your email" name="mail" title="Mail" register={register} />
        <Input
          placeholder="Edit your password"
          name="password"
          title="Password"
          register={register}
        />
        <Input placeholder="Repeat password" name="repeatPassword" title="Repeat password" />
      </Form>
    </section>
  );
};

export default EmployeeProfile;
