import React from 'react';
import styles from '../employees.module.css';

const employeeList = (props) => {
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
        {props.list.map((employee) => (
          <tr key={employee._id}>
            <td>{employee._id}</td>
            <td>{employee.name}</td>
            <td>{employee.lastName}</td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>
            <td>{employee.project}</td>
            <td className={styles.center}>
              <button onClick={() => props.edit(employee._id)}>Edit</button>
            </td>
            <td className={styles.center}>
              <button onClick={() => props.delete(employee)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default employeeList;
