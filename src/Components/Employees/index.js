import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Shared/Table/table.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const Employees = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [feedbackModalDisplay, setFeedbackModalDisplay] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [modalContent, setModalContent] = useState({ message: '', theme: '' });
  const history = useHistory();
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    project: 'Project',
    status: 'Status'
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.data);
      });
  }, []);

  const employeeDelete = (item) => {
    setSelectedEmployee(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${selectedEmployee._id}`, {
        method: 'DELETE'
      }).then((res) => {
        if (res.ok) {
          setEmployees([...employees.filter((listItem) => listItem._id !== selectedEmployee._id)]);
          setModalContent({ message: 'Employee deleted successfully', theme: 'success' });
          setFeedbackModalDisplay(true);
        } else {
          setModalContent({
            message: `The employee could not be deleted. Status: ${res.status} ${res.statusText}`,
            theme: 'error'
          });
          setFeedbackModalDisplay(true);
        }
      });
    }
  };

  const employeeEdit = (item) => {
    history.push('/employees/form', item);
  };

  return (
    <section className={styles.container}>
      <Table
        headers={headers}
        data={employees.map((employee) => ({
          ...employee,
          name: employee.name,
          lastName: employee.lastName,
          phone: employee.phone,
          email: employee.email,
          project: employee.project ? `${employee.project?.name}` : 'N/A',
          status: employee.active ? 'active' : 'inactive'
        }))}
        editItem={employeeEdit}
        deleteItem={employeeDelete}
        title="Employees"
        addRedirectLink={'/employees/form'}
        itemsPerPage={5}
      />
      {feedbackModalDisplay ? (
        <Modal
          heading={modalContent.message}
          setModalDisplay={setFeedbackModalDisplay}
          theme={modalContent.theme}
        />
      ) : null}
      {modalDisplay && (
        <Modal
          heading={`Are you sure you want to delete this Employees: ${selectedEmployee.name} ${selectedEmployee.lastName}?`}
          setModalDisplay={setModalDisplay}
          theme={'confirm'}
        >
          <Button
            label="Confirm"
            theme="tertiary"
            onClick={() => {
              handleDelete();
              setModalDisplay(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default Employees;
