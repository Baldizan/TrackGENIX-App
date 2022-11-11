import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';

const FormAdmins = () => {
  // const history = useHistory();
  let history = useHistory();
  const selectedAdmin = history.location.state?._id;
  const [titleForm, setTitleForm] = useState('Add new admin');
  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });

  useEffect(() => {
    if (selectedAdmin) {
      fetch(`${process.env.REACT_APP_API_URL}/admins/${selectedAdmin}`)
        .then((res) => res.json())
        .then((json) => {
          setAdminInput({
            name: json.data.name,
            lastName: json.data.lastName,
            email: json.data.email,
            password: json.data.password
          });
        });
      setTitleForm('Edit admin');
    }
  }, []);

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedAdmin) {
      editItem(adminInput);
    } else {
      addItem(adminInput);
    }
  };

  const addItem = ({ name, lastName, email, password }) => {
    const newItem = {
      name,
      lastName,
      email,
      password
    };

    fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then((res) => {
        setModalDisplay(true);
        setModalContent({ message: res.message, error: res.error });
        console.log(res.status);
        if (!modalDisplay) {
          history.push('/admins');
        }
      })
      .then((json) => {
        console.log(json.error);
        if (!modalDisplay) {
          history.push('/admins');
        }
      });
  };

  const editItem = ({ name, lastName, email, password }) => {
    const editItem = {
      name,
      lastName,
      email,
      password
    };

    fetch(`${process.env.REACT_APP_API_URL}/admins/${selectedAdmin}`, {
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
        console.log(json.error);
        if (!json.error) {
          history.push('/admins');
        }
      });
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

export default FormAdmins;
