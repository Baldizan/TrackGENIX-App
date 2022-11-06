import React from 'react';
import styles from './table.module.css';

const Table = ({ data, headers, handleDelete, handleEdit, setModal, path }) => {
  const onClick = (id) => {
    window.location.assign(`/${path}/form?id=${id}`);
  };

  const confirmDelete = (id, modal) => {
    handleDelete(id);
    setModal(modal);
  };

  const confirmEdit = (id, modal) => {
    handleEdit(id);
    setModal(modal);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th>
              <img />
            </th>
            <th>
              <img />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row._id}>
                {headers.map((header, index) => {
                  return (
                    <td
                      key={index}
                      onClick={() => {
                        onClick(row._id);
                      }}
                    >
                      {row[header]}
                    </td>
                  );
                })}
                <td>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmEdit(row._id, true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(row._id, true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
