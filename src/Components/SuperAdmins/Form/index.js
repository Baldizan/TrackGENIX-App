import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const FormSuperAdmins = () => {
  const history = useHistory();
  const [selectedSuperAdmin] = useState(history.location.state?.id);
  const [titleForm, setTitleForm] = useState('Add new SuperAdmin');
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  setModalContent;

  useEffect(() => {
    if (selectedSuperAdmin) {
      fetch(`${process.env.REACT_APP_API_URL}/super-admins/${selectedSuperAdmin}`)
        .then((res) => res.json())
        .then((json) => {
          setSuperAdminInput({
            name: json.data.name,
            lastName: json.data.lastName,
            email: json.data.email,
            password: json.data.password
          });
        });
      setTitleForm('Edit SuperAdmin');
    }
  }, []);

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedSuperAdmin) {
      editItem(superAdminInput);
    } else {
      addItem(superAdminInput);
    }
  };

  const addItem = ({ name, lastName, email, password }) => {
    const newItem = {
      name,
      lastName,
      email,
      password
    };

    fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const editItem = ({ name, lastName, email, password }) => {
    const editItem = {
      name,
      lastName,
      email,
      password
    };

    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${selectedSuperAdmin}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editItem)
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  return (
    <section className={styles.container}>
      <Form onSubmit={onSubmit} title={titleForm}>
        <Input
          onChange={onChange}
          placeholder={'Enter your name'}
          value={superAdminInput.name}
          name="name"
          title="Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter your last name'}
          value={superAdminInput.lastName}
          name="lastName"
          title="Last Name"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a valid email address'}
          value={superAdminInput.email}
          name="email"
          title="Email"
          required
        />
        <Input
          onChange={onChange}
          placeholder={'Enter a password'}
          value={superAdminInput.password}
          type="password"
          name="password"
          title="Password"
          required
        />
      </Form>
      {modalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={setModalDisplay}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default FormSuperAdmins;
