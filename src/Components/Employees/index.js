import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './employees.module.css';

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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.project}</td>
              <td className={styles.center}>
                <button onClick={() => editEmployee(employee._id)}>Edit</button>
              </td>
              <td className={styles.center}>
                <button onClick={() => handleDelete(employee)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Employees;
