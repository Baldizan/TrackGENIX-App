import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './validations';
import { schemaPass } from './validationsPass';
import styles from './profile.module.css';
import { putSuperAdmins } from 'redux/SuperAdmins/thunks';
import { fetchUser } from 'redux/Auth/thunks';
import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';

const SuperAdminProfile = () => {
  const dispatch = useDispatch();
  const { user, authenticated } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem('token');
  const { isPending } = useSelector((state) => state.superAdmins);
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

  const handleAdd = () => {
    setFormPass(true);
  };
  const onSubmitPass = (data) => {
    dispatch(putSuperAdmins(user._id, data, token));
    setIsModal(true);
    setFormPass(false);
  };

  useEffect(() => {
    if (!user.email) {
      dispatch(fetchUser(authenticated.role, authenticated.email, token));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const SuperAdminProfile = {
        name: user.name,
        lastName: user.lastName,
        email: user.email
      };
      reset(SuperAdminProfile);
    }
  }, [user]);

  const onSubmit = (data) => {
    dispatch(putSuperAdmins(data._id, data, token));
    setIsModal(true);
  };

  return (
    <section className={styles.container}>
      {!isPending && (
        <Form
          title="My profile"
          onSubmit={handleSubmit(onSubmit)}
          noValidate={!isValid}
          secondColumnIndex={2}
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
            placeholder="Edit your email"
            id="email"
            name="email"
            title="Email"
            register={register}
            error={errors.email?.message}
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

export default SuperAdminProfile;
