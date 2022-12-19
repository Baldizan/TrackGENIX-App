import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, putEmployee } from 'redux/Employees/thunks.js';
import styles from './employees.module.css';
import Button from 'Components/Shared/Button';
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
  const [modalContent, setModalContent] = useState({ message: '', theme: '' });
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    projectName: 'Project',
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
          message: `Employee ${selectedEmployee.active ? 'deactivated' : 'activated'} successfully`,
          theme: 'success'
        });
        setIsFeedbackModal(true);
      } else {
        setModalContent({
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
    status: row.active ? 'Active' : 'Inactive',
    projectName: row.project?.name ?? 'N/A'
  }));

  const handleEdit = (item) => {
    history.push('/admin/employees/form', { ...item, project: item.project?._id });
  };

  return (
    <section className={styles.container}>
      {!isPending && !error && (
        <Table
          data={employeesColumns}
          headers={headers}
          editItem={handleEdit}
          deleteItem={handleActive}
          title="Employees"
          itemsPerPage={5}
          isSearchEnabled
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
          heading={`Are you sure you want to ${
            selectedEmployee.active ? 'deactivate' : 'activate'
          } employee ${selectedEmployee.name} ${selectedEmployee.lastName}?`}
          setModalDisplay={setIsModal}
          theme={'confirm'}
        >
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
              deactivateItem();
              setIsModal(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default Employees;