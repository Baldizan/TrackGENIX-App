import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form';
import { Input } from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmins, getSuperAdmins } from '../../../redux/SuperAdmins/thunks';

const FormSuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [titleForm, setTitleForm] = useState('Add new SuperAdmin');
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const { list, isPending, error } = useSelector((state) => state.superAdmins);
  const [idSuperAdmin] = useState(history.location.state?.id);
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
    }
  }, []);

  useEffect(() => {
    if (idSuperAdmin && list.length > 0) {
      const newSuperAdmin = list.find((l) => l._id === idSuperAdmin);
      setSuperAdmin(newSuperAdmin);
    }
  }, [list]);

  const onChange = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
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

  //   fetch(`${process.env.REACT_APP_API_URL}/super-admins/${idSuperAdmin}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setSuperAdminInput({
  //         name: json.data.name,
  //         lastName: json.data.lastName,
  //         email: json.data.email,
  //         password: json.data.password
  //       });
  //     });
  //
  // }
  // const editItem = ({ name, lastName, email, password }) => {
  //   const editItem = {
  //     name,
  //     lastName,
  //     email,
  //     password
  //   };
  //   dispatch(putSuperAdmins(idSuperAdmin, editItem));
  //   // fetch(`${process.env.REACT_APP_API_URL}/super-admins/${idSuperAdmin}`, {
  //   //   method: 'put',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify(editItem)
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((json) => {
  //   //     // setModalDisplay(true);
  //   //     setModalContent({ message: json.message, error: json.error });
  //   //   });
  // };

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
    if (idSuperAdmin) {
      dispatch(putSuperAdmins(idSuperAdmin, superAdmin));
      history.push(`/Super-admins`);
    } else {
      dispatch(postSuperAdmins(superAdmin));
      setModal(true);
      setModalContent(error);
      history.push(`/Super-admins`);
    }
  };

  // console.log(superAdminInput);

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
