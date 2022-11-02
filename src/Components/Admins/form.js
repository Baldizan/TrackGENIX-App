// import styles from './admins.module.css';
import React, { useState } from 'react';

function AdminForm({ rowId }) {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(event);
    addEditAdmin();
    setContactInfo({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  const addEditAdmin = async () => {
    try {
      await fetch(
        rowId.length > 0
          ? `${process.env.REACT_APP_API_URL}/admins/${rowId}`
          : `${process.env.REACT_APP_API_URL}/admins`,
        {
          method: rowId.length > 0 ? 'PUT' : 'POST',
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={contactInfo?.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={contactInfo?.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email Address:
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={contactInfo?.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={contactInfo?.password}
          onChange={handleChange}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}

export default AdminForm;
