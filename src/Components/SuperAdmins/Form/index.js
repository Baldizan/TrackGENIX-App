import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmins, getSuperAdmins } from '../../../redux/SuperAdmins/thunks';
import Error from '../../Shared/Error';

const FormSuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list, isPending, error } = useSelector((state) => state.superAdmins);
  const [titleForm, setTitleForm] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modal, setModal] = useState(false);
  const [idSuperAdmin] = useState(history.location.state?.id);
  const [theme, setTheme] = useState('');
  const [superAdmin, setSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (idSuperAdmin) {
      setTitleForm('Edit SuperAdmin');
      dispatch(getSuperAdmins());
    } else {
      setTitleForm('Add SuperAdmin');
    }
  }, []);

  useEffect(() => {
    if (idSuperAdmin && list.length > 0) {
      const newSuperAdmin = list.find((item) => item._id === idSuperAdmin);
      setSuperAdmin(newSuperAdmin);
    }
  }, [list]);

  useEffect(() => {
    if (error) {
      setTheme('error');
      setModalContent(error);
    } else {
      setTheme('success');
      setModalContent(
        idSuperAdmin ? 'Edit super admin successfully' : 'Add super admin successfully'
      );
    }
  }, [error]);

  const onChange = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    if (error) {
      setModal(false);
    } else {
      history.push(`/Super-admins`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (idSuperAdmin) {
      dispatch(putSuperAdmins(idSuperAdmin, superAdmin));
      setModal(true);
    } else {
      dispatch(postSuperAdmins(superAdmin));
      setModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <Form onSubmit={onSubmit} title={titleForm}>
        <Input
          onChange={onChange}
          placeholder={'Enter your name'}
          value={superAdmin.name}
          name="name"
          title="Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter your last name'}
          value={superAdmin.lastName}
          name="lastName"
          title="Last Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a valid email address'}
          value={superAdmin.email}
          name="email"
          title="Email"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a password'}
          value={superAdmin.password}
          type="password"
          name="password"
          title="Password"
          required
        />
      </Form>
      {isPending && <p>...loading</p>}
      {modal && <Modal setModalDisplay={handleCloseModal} heading={modalContent} theme={theme} />}
      <Error text={error} />
    </section>
  );
};
export default FormSuperAdmins;
