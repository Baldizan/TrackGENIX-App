import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins } from '../../../redux/SuperAdmins/thunks';

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
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const dispatch = useDispatch();
  setModalContent;
  const { isPending, error } = useSelector((state) => state.superAdmins);

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

  // const addItem = () => {
  //   // const newItem = {
  //   //   name,
  //   //   lastName,
  //   //   email,
  //   //   password
  //   // };
  //   postSuperAdmins(newItem);
  //   // fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
  //   //   method: 'post',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify(newItem)
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((json) => {
  //   //     setModalDisplay(true);
  //   //
  //   //   });
  // };

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
        // setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const handleCloseModal = () => {
    if (!modalContent.error) {
      //setModalDisplay(false);
      history.push(`/Super-admins`);
    } else {
      //setModalDisplay(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedSuperAdmin) {
      editItem(superAdminInput);
    } else {
      dispatch(postSuperAdmins(superAdminInput));
      setModal(true);
      setModalContent(error);
    }
  };

  console.log(superAdminInput);

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
      {isPending && <p>...loading</p>}
      {modal && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={handleCloseModal}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};
export default FormSuperAdmins;
