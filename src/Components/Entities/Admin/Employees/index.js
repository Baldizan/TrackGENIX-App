import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, putEmployee } from 'redux/Employees/thunks.js';
import styles from './employees.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader/index.js';
import Error from 'Components/Shared/Error/index.js';

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: employeesList, isPending, error } = useSelector((state) => state.employees);
  const [isModal, setIsModal] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const token = sessionStorage.getItem('token');
  const [modalContent, setModalContent] = useState({ heading: '', message: '', theme: '' });
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  const handleActive = (item) => {
    setSelectedEmployee(item);
    setIsModal(true);
  };

  const deactivateItem = () => {
    if (selectedEmployee) {
      dispatch(putEmployee(selectedEmployee._id, { active: !selectedEmployee.active }, token));
      if (!error) {
        setModalContent({
          heading: 'Success!',
          message: `Employee successfully ${
            selectedEmployee.active ? 'deactivated' : 'activated'
          }.`,
          theme: 'success'
        });
        setIsFeedbackModal(true);
      } else {
        setModalContent({
          heading: 'There was an error!',
          message: `The employee could not be ${
            selectedEmployee.active ? 'deactivated' : 'activated'
          }. Status: ${error.status} ${error.statusText}`,
          theme: 'error'
        });
        setIsFeedbackModal(true);
      }
    }
  };

  const employeesColumns = employeesList?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive'
  }));

  const handleEdit = (item) => {
    history.push('/admin/employees/form', item);
  };

  return (
    <section className={styles.container}>
      {!isPending && !error && (
        <Table
          data={employeesColumns}
          headers={headers}
          editItem={handleEdit}
          editStatus={handleActive}
          title="Employees"
          itemsPerPage={5}
          isSearchEnabled
        />
      )}
      {isFeedbackModal && (
        <Modal
          heading={modalContent.heading}
          message={modalContent.message}
          setModalDisplay={setIsFeedbackModal}
          theme={modalContent.theme}
        />
      )}
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && isModal && (
        <Modal
          heading="Confirmation required"
          setModalDisplay={setIsModal}
          theme="confirm"
          message={`Are you sure you want to ${
            selectedEmployee.active ? 'deactivate' : 'activate'
          } ${selectedEmployee.name} ${selectedEmployee.lastName}'s account?`}
          confirmFunction={deactivateItem}
        />
      )}
    </section>
  );
};

export default Employees;
