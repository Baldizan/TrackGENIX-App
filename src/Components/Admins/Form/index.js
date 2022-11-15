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
  const { list, isPending } = useSelector((state) => state.admins);
  const [titleForm, setTitleForm] = useState('');
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    if (selectedAdmin) {
      setTitleForm('Edit admin');
      setModalContent('Admin edited successfully');
      dispatch(getAdmins());
    } else {
      setTitleForm('Add new admin');
      setModalContent('Admin added successfully');
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
      setModal(true);
    } else {
      dispatch(addAdmin(adminInput));
      setModal(true);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    history.push(`/admins`);
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
        <Modal heading={modalContent} setModalDisplay={handleCloseModal} theme={'success'} />
      )}
    </section>
  );
};

export default FormAdmins;
