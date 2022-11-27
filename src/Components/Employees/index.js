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
  const { list: projectsList } = useSelector((state) => state.projects);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [modalProjects, setModalProjects] = useState(false);
  const [employeeProjects, setEmployeeProjects] = useState(employeesList);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', theme: '' });
  const headers = {
    name: 'Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    project: 'Project',
    projectsCmp: 'Projects',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const employeesColumns = employeesList.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    project: row.project?.name ?? 'N/A',
    projectsCmp: (
      <Button
        label="See projects"
        theme="primary"
        onClick={() => showProjects(row.projects.filter((p) => p.project !== null))}
      />
    )
  }));

  const showProjects = (projects) => {
    if (projects) {
      const employeeProjects = projectsList.map((project) => ({
        name: project.name,
        startDate: project.startDate?.slice(0, 10),
        endDate: project.endDate?.slice(0, 10)
      }));
      setEmployeeProjects(employeeProjects);
      setModalProjects(true);
    }
  };

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
    history.push('/employees/form', {
      _id: item._id,
      name: item.name,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      active: item.active,
      password: item.password
    });
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
        />
      )}
      {modalProjects && (
        <Modal setModalDisplay={setModalProjects} theme="confirm">
          <div className={styles.projectsTableContainer}>
            <Table
              data={employeeProjects}
              headers={{ name: 'Project', startDate: 'Start date', endDate: 'End date' }}
              title="Employee's projects"
            />
          </div>
        </Modal>
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
      {isModal && (
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
