import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee, getEmployees } from '../../redux/Employees/thunks.js';
import styles from './employees.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

const Employees = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [feedbackModalDisplay, setFeedbackModalDisplay] = useState(false);
  const { list: employeesList, isPending, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
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
    dispatch(getEmployees());
  }, []);

  const employeesColumns = employeesList.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    project: row.project?.name ?? 'N/A'
  }));

  const employeeDelete = (item) => {
    setSelectedEmployee(item);
    setModalDisplay(true);
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployee(selectedEmployee._id));
      if (!error) {
        setModalContent({ message: 'Employee deleted successfully', theme: 'success' });
        setFeedbackModalDisplay(true);
      } else {
        setModalContent({
          message: `The employee could not be deleted. Status: ${error.status} ${error.statusText}`,
          theme: 'error'
        });
        setFeedbackModalDisplay(true);
      }
    }
  };

  const employeeEdit = (item) => {
    history.push('/employees/form', item);
  };

  return (
    <section className={styles.container}>
      {isPending && <p>Loading...</p>}
      {!isPending && !error && (
        <Table
          data={employeesColumns}
          headers={headers}
          editItem={employeeEdit}
          deleteItem={employeeDelete}
          title="Employees"
          addRedirectLink={'/employees/form'}
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
      {feedbackModalDisplay && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={setFeedbackModalDisplay}
          theme={modalContent.theme}
        />
      )}
      {modalDisplay && (
        <Modal
          heading={`Are you sure you want to delete employee: ${selectedEmployee.name} ${selectedEmployee.lastName}?`}
          setModalDisplay={setModalDisplay}
          theme={'confirm'}
        >
          <p>This change cannot be undone</p>
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
