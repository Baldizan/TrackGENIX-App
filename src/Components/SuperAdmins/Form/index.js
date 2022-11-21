import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmins, getSuperAdmins } from 'redux/SuperAdmins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import { Input } from 'Components/Shared/Input';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import { schema } from './validations';

const FormSuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.superAdmins);
  const [modal, setModal] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', lastName: '' });
  const [selectedSuperAdmin] = useState(history.location.state);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getSuperAdmins());
    selectedSuperAdmin &&
      reset({
        name: selectedSuperAdmin?.name,
        lastName: selectedSuperAdmin?.lastName,
        email: selectedSuperAdmin?.email,
        password: selectedSuperAdmin?.password
      });
  }, []);

  const handleCloseModal = () => {
    if (error) {
      setModal(false);
    } else {
      history.push(`/Super-admins`);
    }
  };

  const onSubmit = (data) => {
    if (selectedSuperAdmin) {
      dispatch(putSuperAdmins(selectedSuperAdmin._id, data));
      setFeedback({ name: data.name, lastName: data.lastName });
      setModal(true);
    } else {
      dispatch(postSuperAdmins(data));
      setFeedback({ name: data.name, lastName: data.lastName });
      setModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        title={selectedSuperAdmin ? 'Edit Super Admin' : 'Add Super Admin'}
      >
        <Input
          error={errors.name?.message}
          register={register}
          placeholder={'Enter your name'}
          name="name"
          title="Name"
          required
        />
        <Input
          error={errors.lastName?.message}
          register={register}
          placeholder={'Enter your last name'}
          name="lastName"
          title="Last Name"
          required
        />
        <Input
          error={errors.email?.message}
          register={register}
          placeholder={'Enter a valid email address'}
          name="email"
          title="Email"
          required
        />
        <Input
          error={errors.password?.message}
          register={register}
          placeholder={'Enter a password'}
          type="password"
          name="password"
          title="Password"
          required
        />
      </Form>
      {isPending && <Loader />}
      {modal && (
        <Modal
          heading={
            error
              ? error
              : `Super Admin ${feedback.name} ${feedback.lastName} successfully submitted!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default FormSuperAdmins;
