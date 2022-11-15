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
  const selectedAdmin = history.location.state?._id;
  const { list, isPending, error } = useSelector((state) => state.admins);
  const [titleForm, setTitleForm] = useState('Add new admin');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (selectedAdmin) {
      setTitleForm('Edit admin');
      dispatch(getAdmins());
    }
  }, []);

  useEffect(() => {
    if (selectedAdmin && list.length > 0) {
      const newAdmin = list.find((row) => row._id === selectedAdmin);
      setAdminInput(newAdmin);
    }
  }, [list]);

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedAdmin) {
      dispatch(editAdmin(selectedAdmin, adminInput));
      history.push(`/admins`);
    } else {
      dispatch(addAdmin(adminInput));
      setModalDisplay(true);
      setModalContent(error);
      history.push(`/admins`);
    }
  };

  const handleCloseModal = () => {
    if (!modalContent.error) {
      setModalDisplay(false);
      history.push(`/admins`);
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
      {modalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={handleCloseModal}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default FormAdmins;
