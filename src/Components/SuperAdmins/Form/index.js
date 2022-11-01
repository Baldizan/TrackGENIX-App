import { useState } from 'react';
import styles from './form.module.css';

const FormSuperAdmins = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userInput.name}
            onChange={(e) => {
              setUserInput({
                ...userInput,
                name: e.target.value
              });
            }}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userInput.lastName}
            onChange={(e) => {
              setUserInput({
                ...userInput,
                lastName: e.target.value
              });
            }}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={userInput.email}
            onChange={(e) => {
              setUserInput({
                ...userInput,
                email: e.target.value
              });
            }}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userInput.password}
            onChange={(e) => {
              setUserInput({
                ...userInput,
                password: e.target.value
              });
            }}
            required
          />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default FormSuperAdmins;
