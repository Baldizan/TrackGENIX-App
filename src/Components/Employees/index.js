import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './employees.module.css';
import EmployeesList from './List';

const Employees = () => {
  const [employees, saveEmployees] = useState([]);
  const [selectedEmployee, saveSelection] = useState({});
  const [showModal, saveShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const deleteEmployee = async (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    saveSelection(employees.filter((employee) => employee._id !== id));
  };

  const handleDelete = (employee) => {
    saveSelection({ id: employee._id, name: employee.name });
    saveShowModal(true);
  };

  const editEmployee = (id) => {
    window.location.assign(`/employees/form?id=${id}`);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        handleModal={saveShowModal}
        deleteEmployee={deleteEmployee}
        employee={selectedEmployee}
      />
      <a href="/employees/form" className={styles.button}>
        Add new employee +
      </a>
      <EmployeesList list={employees} delete={handleDelete} edit={editEmployee} />
    </section>
  );
};

export default Employees;
