import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { postSuperAdmins, putSuperAdmins, getSuperAdmins } from 'redux/SuperAdmins/thunks';
import styles from './form.module.css';
import { schema } from './validations';
import { Input } from 'Components/Shared/Input';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const FormSuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPending, error } = useSelector((state) => state.superAdmins);
  const [isModal, setIsModal] = useState(false);
  const [modalContent, setModalContent] = useState({ name: '', lastName: '' });
  const [selectedSuperAdmin] = useState(history.location.state);
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
    dispatch(getSuperAdmins());
    selectedSuperAdmin &&
      reset({
        name: selectedSuperAdmin?.name,
        lastName: selectedSuperAdmin?.lastName,
        email: selectedSuperAdmin?.email,
        password: selectedSuperAdmin?.password
      });
  }, []);

  const handleModalClose = () => {
    if (error) {
      setIsModal(false);
    } else {
      history.push(`/Super-admins`);
    }
  };

  const onSubmit = (data) => {
    if (selectedSuperAdmin) {
      dispatch(putSuperAdmins(selectedSuperAdmin._id, data));
      setModalContent({ name: data.name, lastName: data.lastName });
      setIsModal(true);
    } else {
      dispatch(postSuperAdmins(data));
      setModalContent({ name: data.name, lastName: data.lastName });
      setIsModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        title={selectedSuperAdmin ? 'Edit Super Admin' : 'Add Super Admin'}
        noValidate={!isValid}
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
      {!isPending && isModal && (
        <Modal
          heading={
            error
              ? error
              : `Super Admin ${modalContent.name} ${modalContent.lastName} successfully submitted!`
          }
          setModalDisplay={handleModalClose}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default FormSuperAdmins;
