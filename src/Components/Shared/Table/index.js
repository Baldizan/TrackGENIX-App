import React from 'react';
import styles from './table.module.css';

const Table = ({ data, headers }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr className={styles.tr} key={row._id}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.td}>
                      {row[header]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
