import { useEffect, useState } from 'react';
import styles from './form.module.css';

const EmployeesForm = () => {
  const paramsURL = new URLSearchParams(window.location.search);
  const id = paramsURL.get('id');
  const [employee, setEmployee] = useState({});
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [projectsValue, setProjectValues] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployee(response.data);
        });
    }
  }, []);

  useEffect(() => {
    if (employee._id) {
      setNameValue(employee.name);
      setLastNameValue(employee.lastName);
      setPhoneValue(employee.phone);
      setEmailValue(employee.email);
      setProjectValues(employee.project);
    }
  }, [employee]);

  const sendEmployee = () => {
    const body = JSON.stringify({
      name: nameValue,
      lastName: lastNameValue,
      phone: phoneValue,
      email: emailValue,
      password: passwordValue,
      project: projectsValue
    });

    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then((response) => response.json());
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then((response) => response.json());
    }
  };

  const nameInput = (event) => {
    setNameValue(event.target.value);
  };

  const lastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };

  const phoneInput = (event) => {
    setPhoneValue(event.target.value);
  };

  const emailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordInput = (event) => {
    setPasswordValue(event.target.value);
  };
  const projectInput = (event) => {
    setProjectValues(event.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.container}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          required
          value={nameValue}
          onChange={nameInput}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          value={lastNameValue}
          onChange={lastNameInput}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          placeholder="phone"
          required
          value={phoneValue}
          onChange={phoneInput}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          required
          value={emailValue}
          onChange={emailInput}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={passwordValue}
          onChange={passwordInput}
        />
        <label htmlFor="project">Project:</label>
        <input
          id="project"
          name="project"
          placeholder="Project"
          required
          value={projectsValue}
          onChange={projectInput}
        />
      </form>
      <button onClick={sendEmployee}>Add</button>
      <a href="/employees">
        <button>Cancel</button>
      </a>
    </section>
  );
};

export default EmployeesForm;
