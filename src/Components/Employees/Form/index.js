import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Form from '../../Shared/Form/index';
import Button from '../../Shared/Button';
import { Input, Select } from '../../Shared/Input/index';
import Modal from '../../Shared/Modal';

const EmployeesForm = () => {
  let history = useHistory();
  const [selectedEmployee] = useState(history.location.state);
  const [allProjects, setAllProjects] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', error: '' });
  const [employeeInput, setEmployeeInput] = useState(
    selectedEmployee ?? {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      project: '',
      active: false
    }
  );

  const body = JSON.stringify({
    name: employeeInput.name,
    lastName: employeeInput.lastName,
    phone: employeeInput.phone,
    email: employeeInput.email,
    password: employeeInput.password,
    project: employeeInput.project,
    active: employeeInput.active
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then((response) => response.json())
      .then((response) => {
        setAllProjects(response.data);
      });
  }, []);

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const editItem = () => {
    fetch(`${process.env.REACT_APP_API_URL}/employees/${selectedEmployee._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then((res) => res.json())
      .then((json) => {
        setModalDisplay(true);
        setModalContent({ message: json.message, error: json.error });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      editItem(employeeInput);
    } else {
      addItem(employeeInput);
    }
  };

  const handleCloseModal = () => {
    if (!modalContent.error) {
      setModalDisplay(false);
      history.push(`/employees`);
    } else {
      setModalDisplay(false);
    }
  };

  return (
    <section className={styles.container}>
      <Form onSubmit={onSubmit}>
        <Input
          id="name"
          name="name"
          placeholder="Name"
          required
          value={employeeInput.name}
          onChange={onChange}
        />
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          value={employeeInput.lastName}
          onChange={onChange}
        />
        <Input
          id="phone"
          name="phone"
          placeholder="Phone"
          required
          value={employeeInput.phone}
          onChange={onChange}
        />
        <Input
          id="email"
          name="email"
          placeholder="Email"
          required
          value={employeeInput.email}
          onChange={onChange}
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={employeeInput.password}
          onChange={onChange}
        />
        <Select
          onChange={onChange}
          title="Project"
          placeholder="Project"
          name="project"
          value={employeeInput.project}
          arrayToMap={allProjects.map((project) => ({
            id: project._id,
            label: project.name
          }))}
          required
        />
        {selectedEmployee ? (
          <Select
            onChange={onChange}
            title="Active"
            name="active"
            value={employeeInput.active}
            arrayToMap={[
              { id: true, label: 'Active' },
              { id: false, label: 'Inactive' }
            ]}
            placeholder="Status"
            required
          />
        ) : null}
        <Button label={'Cancel'} onClick={() => history.push('/employees')} />
      </Form>
      {modalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={handleCloseModal}
          theme={modalContent.error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default EmployeesForm;
