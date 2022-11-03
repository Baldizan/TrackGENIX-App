import React, { useState } from 'react';

function AdminForm({ rowId, setModalDisplay, saveAdmins, admins }) {
  const selectedAdmin = rowId ? admins.find((admin) => admin._id === rowId) : null;
  const [contactInfo, setContactInfo] = useState(selectedAdmin);
  const index = admins.indexOf(selectedAdmin);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEditAdmin();
    saveAdmins(admins);
    setContactInfo({});
    setModalDisplay();
  };

  const addEditAdmin = async () => {
    const updateList =
      index !== -1 ? admins.splice(index, 1, contactInfo) : admins.push(contactInfo);
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
      updateList();
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
      <button onClick={() => {}}>Submit</button>
    </form>
  );
}

export default AdminForm;
