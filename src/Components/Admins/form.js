import styles from './admins.module.css';
import React, { useState } from 'react';
import Modal from './modal';

function AdminsFormModal({ reqFunction, rowId }) {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const addEditAdmin = () => {
    fetch(
      rowId
        ? `${process.env.REACT_APP_API_URL}/admins/${rowId}`
        : `${process.env.REACT_APP_API_URL}/admins`,
      {
        method: rowId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactInfo.name,
          lastName: contactInfo.lastName,
          email: contactInfo.email,
          password: contactInfo.password
        })
      }
    );
  };

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEditAdmin();
    setContactInfo({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <Modal
      reqFunction={reqFunction}
      content={
        <section className={styles.container}>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="name"
                placeholder="First Name"
                value={rowId?.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={rowId?.lastName}
                onChange={handleChange}
              />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={rowId?.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={rowId?.password}
                onChange={handleChange}
              />
            </label>
          </form>
        </section>
      }
      cancelButton="Cancel"
      confirmButton="Save"
    />
  );
}

export default AdminsFormModal;
