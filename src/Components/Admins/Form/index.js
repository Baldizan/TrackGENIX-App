import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editAdmin, addAdmin, getAdmins } from '../../../redux/Admins/thunks';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const FormAdmins = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [selectedAdmin] = useState(history.location.state);
  const { isPending, error } = useSelector((state) => state.admins);
  const titleForm = selectedAdmin ? 'Edit admin' : 'Add new admin';

  const [modal, setModal] = useState(false);
  const [adminInput, setAdminInput] = useState(
    selectedAdmin ?? {
      name: '',
      lastName: '',
      email: '',
      password: ''
    }
  );
  useEffect(() => {
    if (selectedAdmin) {
      dispatch(getAdmins());
    }
  }, []);

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedAdmin) {
      dispatch(editAdmin(selectedAdmin._id, adminInput));
      setModal(true);
    } else {
      dispatch(addAdmin(adminInput));
      setModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
      setModal(false);
      history.push(`/admins`);
    } else {
      setModal(false);
    }
  };

  return (
    <section className={styles.container}>
      <Form onSubmit={onSubmit} title={titleForm}>
        <Input
          onChange={onChange}
          placeholder={'Enter your name'}
          value={adminInput.name}
          name="name"
          title="Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter your last name'}
          value={adminInput.lastName}
          name="lastName"
          title="Last Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a valid email address'}
          value={adminInput.email}
          name="email"
          title="Email"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a password'}
          value={adminInput.password}
          type="password"
          name="password"
          title="Password"
          required
        />
      </Form>
      {isPending && <p>...Loading</p>}
      {modal && (
        <Modal
          heading={
            error ? error : `Admin ${adminInput.name} ${adminInput.lastName} submited successfully!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default FormAdmins;
