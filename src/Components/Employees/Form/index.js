import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
import { Input, Select } from '../../Shared/Input/index';

const EmployeesForm = () => {
  let history = useHistory();
  const [selectedEmployee] = useState(history.location.state);
  const [allProjects, setProject] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [projectsValue, setProjectValues] = useState('');
  const [employee, setEmployee] = useState(
    selectedEmployee ?? {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      project: ''
    }
  );
  useEffect(() => {
    if (selectedEmployee) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${selectedEmployee._id}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployee(response.data);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then((response) => response.json())
      .then((response) => {
        setProject(response.data);
      });
  }, []);

  useEffect(() => {
    if (employee._id) {
      setNameValue(employee.name);
      setLastNameValue(employee.lastName);
      setPhoneValue(employee.phone);
      setEmailValue(employee.email);
      setProjectValues(allProjects.name);
      setPasswordValue(employee.password);
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

    if (selectedEmployee._id) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${selectedEmployee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then((response) => response.json());
      if (
        !nameValue ||
        !lastNameValue ||
        !phoneValue ||
        !emailValue ||
        !passwordValue ||
        !projectsValue
      ) {
        alert('Please complete all required fields');
      } else {
        alert('Employees edited successfully');
        history.push('/employees');
      }
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then((response) => response.json());
      if (
        !nameValue ||
        !lastNameValue ||
        !phoneValue ||
        !emailValue ||
        !passwordValue ||
        !projectsValue
      ) {
        alert('Please complete all required fields');
      } else {
        alert('Employees created successfully');
        history.push('/employees');
      }
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
    setProjectValues({ ...employee, id: event.target.value });
  };
  return (
    <section className={styles.container}>
      <Form onSubmit={sendEmployee}>
        <Input
          id="name"
          name="name"
          placeholder="Name"
          required
          value={nameValue}
          onChange={nameInput}
        />
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          value={lastNameValue}
          onChange={lastNameInput}
        />
        <Input
          id="phone"
          name="phone"
          placeholder="Phone"
          required
          value={phoneValue}
          onChange={phoneInput}
        />
        <Input
          id="email"
          name="email"
          placeholder="Email"
          required
          value={emailValue}
          onChange={emailInput}
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={passwordValue}
          onChange={passwordInput}
        />
        <Select
          placeholder="Project"
          required
          value={selectedEmployee.project?._id}
          onChange={projectInput}
          arrayToMap={allProjects.map((project) => ({
            id: project._id,
            label: project.name
          }))}
        />
        {/* {selectedEmployee ? (
          <Select
            title="Active"
            name="active"
            value={employee.active}
            arrayToMap={employee.map(() => ({
              id: selectedEmployee.active,
              label: selectedEmployee
            }))}
            placeholder="Status"
            id="active"
            required
          />
        ) : null} */}
        <Button label={'Cancel'} onClick={() => history.push('/employees')} />
      </Form>
    </section>
  );
};

export default EmployeesForm;
