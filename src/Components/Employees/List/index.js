import React from 'react';
import styles from '../employees.module.css';

const employeesList = ({ employees, handleDelete, editEmployee }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>name</th>
          <th>lastName</th>
          <th>phone</th>
          <th>email</th>
          <th>projects</th>
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
  );
};

export default employeesList;
