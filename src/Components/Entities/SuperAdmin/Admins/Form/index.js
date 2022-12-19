import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editAdmin, addAdmin } from 'redux/Admins/thunks';
import { schema } from './validations';
import styles from './form.module.css';
import Form from 'Components/Shared/Form';
import { Input, Select } from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const FormAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const [feedback, setFeedback] = useState({ name: '', lastName: '' });
  const [isModal, setIsModal] = useState(false);
  const [selectedAdmin] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.admins);
  const titleForm = selectedAdmin ? 'Edit admin' : 'Add new admin';
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
    selectedAdmin &&
      reset({
        name: selectedAdmin?.name,
        lastName: selectedAdmin?.lastName,
        email: selectedAdmin?.email,
        password: selectedAdmin?.password,
        active: selectedAdmin?.active
      });
  }, []);

  const onSubmit = (data) => {
    if (selectedAdmin) {
      dispatch(editAdmin(selectedAdmin._id, data, token));
      setIsModal(true);
    } else {
      dispatch(addAdmin(data, token));
      setIsModal(true);
    }
    setFeedback({ name: data.name, lastName: data.lastName });
  };

  const handleModalClose = () => {
    if (!error) {
      setIsModal(false);
      history.push(`/superadmin/admins`);
    } else {
      setIsModal(false);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title={titleForm}
          noValidate={!isValid}
          linktoRedirect="/superadmin/admins"
        >
          <Input
            register={register}
            placeholder={'Enter your name'}
            name="name"
            title="Name"
            required
            error={errors.name?.message}
          />
          <Input
            register={register}
            placeholder={'Enter your last name'}
            name="lastName"
            title="Last Name"
            required
            error={errors.lastName?.message}
          />
          <Input
            register={register}
            placeholder={'Enter a valid email address'}
            name="email"
            title="Email"
            required
            error={errors.email?.message}
          />
          {!selectedAdmin && (
            <Input
              register={register}
              placeholder={'Enter a password'}
              type="password"
              name="password"
              title="Password"
              required
              error={errors.password?.message}
            />
          )}
          <Select
            name="active"
            title="Active"
            placeholder="Select status"
            arrayToMap={[
              { id: true, label: 'Active' },
              { id: false, label: 'Inactive' }
            ]}
            register={register}
            error={errors.active?.message}
            required
          />
        </Form>
      )}
      {isModal && (
        <Modal
          heading={
            error ? error : `Admin ${feedback.name} ${feedback.lastName} successfully submitted!`
          }
          setModalDisplay={handleModalClose}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default FormAdmins;
