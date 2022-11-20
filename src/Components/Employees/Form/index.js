import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postEmployee, putEmployee } from 'redux/Employees/thunks.js';
import { getProjects } from 'redux/Projects/thunks.js';
import styles from './form.module.css';
import Form from 'Components/Shared/Form/index';
import { Input, Select } from 'Components/Shared/Input/index';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';

const EmployeesForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [selectedEmployee] = useState(history.location.state);
  const { list, isPending, error } = useSelector((state) => state.employees);
  const { list: projectsList } = useSelector((state) => state.projects);
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
    dispatch(getProjects());
  }, [list]);

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      if (typeof employeeInput.project != 'string') {
        employeeInput.project = employeeInput.project._id;
      }
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
      <Form
        onSubmit={onSubmit}
        title={selectedEmployee ? 'Edit employee' : 'Add employee'}
        secondColumnIndex={3}
      >
        <Input
          id="name"
          name="name"
          title="First Name"
          placeholder="Name"
          required
          value={employeeInput.name}
          onChange={onChange}
        />
        <Input
          id="lastName"
          name="lastName"
          title="Last Name"
          placeholder="Last name"
          required
          value={employeeInput.lastName}
          onChange={onChange}
        />
        <Input
          id="phone"
          name="phone"
          title="Phone Number"
          placeholder="Phone number"
          required
          value={employeeInput.phone}
          onChange={onChange}
        />
        <Input
          id="email"
          name="email"
          title="Email address"
          placeholder="Email"
          required
          value={employeeInput.email}
          onChange={onChange}
        />
        <Input
          id="password"
          type="password"
          name="password"
          title="Password"
          placeholder="Password"
          required
          value={employeeInput.password}
          onChange={onChange}
        />
        <Select
          onChange={onChange}
          name="project"
          title="Project"
          placeholder="Select project"
          value={employeeInput.project}
          arrayToMap={projectsList.map((project) => ({
            id: project._id,
            label: project.name
          }))}
          required
        />
        {selectedEmployee ? (
          <Select
            onChange={onChange}
            name="active"
            title="Active"
            placeholder="Select status"
            value={employeeInput.active}
            arrayToMap={[
              { id: true, label: 'Active' },
              { id: false, label: 'Inactive' }
            ]}
            required
          />
        ) : null}
      </Form>
      {isPending && <Loader />}
      {modalDisplay && (
        <Modal
          heading={
            error
              ? error
              : `Employee ${employeeInput.name} ${employeeInput.lastName} successfully submitted!`
          }
          setModalDisplay={handleCloseModal}
          theme={error ? 'error' : 'success'}
        />
      )}
    </section>
  );
};

export default EmployeesForm;
