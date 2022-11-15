import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postEmployee, putEmployee } from '../../../redux/Employees/thunks.js';
import styles from './form.module.css';
import Form from '../../Shared/Form/index';
import { Input, Select } from '../../Shared/Input/index';
import Modal from '../../Shared/Modal';

const EmployeesForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [selectedEmployee] = useState(history.location.state);
  const { list, isPending, error } = useSelector((state) => state.employees);
  const [allProjects, setAllProjects] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
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

  useEffect(() => {
    if (selectedEmployee && list.length > 0) {
      const newEmployee = list.find((l) => l._id === selectedEmployee._id);
      setEmployeeInput(newEmployee);
    }
  }, [list]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      dispatch(putEmployee(selectedEmployee._id, employeeInput));
      setModalDisplay(true);
    } else {
      dispatch(postEmployee(employeeInput));
      setModalDisplay(true);
    }
  };

  const handleCloseModal = () => {
    if (!error) {
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
      </Form>
      {isPending && <p>Loading...</p>}
      {modalDisplay && (
        <Modal
          heading={
            error
              ? error
              : `Employee ${employeeInput.name} ${employeeInput.lastName} submited successfully!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default EmployeesForm;
