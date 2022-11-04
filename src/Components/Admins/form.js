import React, { useState } from 'react';

const AdminForm = ({ rowId, setModalDisplay, saveAdmins, admins }) => {
  const selectedAdmin = rowId
    ? admins.find((admin) => admin._id === rowId)
    : { name: '', lastName: '', email: '', password: '', active: false };
  const [contactInfo, setContactInfo] = useState(selectedAdmin);
  const index = admins.indexOf(selectedAdmin);
  const feedback = rowId ? 'Employee Edited' : 'Employee Created';

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
      const result = await fetch(
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
            password: contactInfo.password,
            active: contactInfo.status
          })
        }
      );
      const jsonResult = await result.json();
      if (jsonResult.error === true) {
        return updateList();
      }
      jsonResult.error ? alert(jsonResult.message) : alert(feedback);
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
      {rowId ? (
        <label>
          Active:
          <select name="active" onChange={handleChange} value={contactInfo.active}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
      ) : null}
      <button>Submit</button>
    </form>
  );
};

export default AdminForm;
