import React from 'react';
import styles from './table.module.css';
import Row from './Row';

const Table = ({ data, headers, listItems, editItem, deleteItem }) => {
  console.log(data);
  console.log(listItems);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.toUpperCase()}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Row
              key={item._id}
              listItems={item}
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
