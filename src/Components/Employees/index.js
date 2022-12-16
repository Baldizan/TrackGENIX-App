import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee, getEmployees } from 'redux/Employees/thunks.js';
import styles from './employees.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader/index.js';
import Error from 'Components/Shared/Error/index.js';

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: employeesList, isPending, error } = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const [modalContent, setModalContent] = useState({ message: '', theme: '' });
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    project: 'Project',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  const employeesColumns = employeesList?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    project: row.project?.name ?? 'N/A'
  }));

  const handleDelete = (item) => {
    setSelectedEmployee(item);
    setIsModal(true);
  };

  const deleteItem = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployee(selectedEmployee._id));
      if (!error) {
        setModalContent({ message: 'Employee deleted successfully', theme: 'success' });
        setIsFeedbackModal(true);
      } else {
        setModalContent({
          message: `The employee could not be deleted. Status: ${error.status} ${error.statusText}`,
          theme: 'error'
        });
        setIsFeedbackModal(true);
      }
    }
  };

  const handleEdit = (item) => {
    history.push('/employees/form', { ...item, project: item.project?._id });
  };

  return (
    <section className={styles.container}>
      {!isPending && !error && (
        <Table
          data={employeesColumns}
          headers={headers}
          editItem={handleEdit}
          deleteItem={handleDelete}
          title="Employees"
          addRedirectLink={'/employees/form'}
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {isFeedbackModal && (
        <Modal
          heading={modalContent.message}
          setModalDisplay={setIsFeedbackModal}
          theme={modalContent.theme}
        />
      )}
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && isModal && (
        <Modal
          heading={`Are you sure you want to delete employee ${selectedEmployee.name} ${selectedEmployee.lastName}?`}
          setModalDisplay={setIsModal}
          theme={'confirm'}
        >
          <p>This change cannot be undone!</p>
          <Button
            label={'Cancel'}
            theme={'primary'}
            onClick={() => {
              setIsModal();
            }}
          />
          <Button
            label="Confirm"
            theme="tertiary"
            onClick={() => {
              deleteItem();
              setIsModal(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default Employees;
