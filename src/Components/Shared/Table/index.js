import React from 'react';
import styles from './table.module.css';
import Row from './Row/index';

const Table = ({ data, headers, editItem, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Row
              key={item._id}
              rowItem={item}
              headers={headers}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
