import React from 'react';
import Button from '../../Button';
import styles from './row.module.css';

const Row = ({ headers, rowItem, deleteItem, editItem }) => {
  const handleEdiClick = () => {
    editItem(rowItem);
  };
  const handleDeleteClick = () => {
    deleteItem(rowItem);
  };

  return (
    <tr className={styles.tr}>
      {headers?.map((prop, i) => (
        <td key={i} className={styles.td}>
          {rowItem[prop]}
        </td>
      ))}
      <td className={styles.btnContainer}>
        {editItem && (
          <Button
            style={styles.btnEdit}
            icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
            onClick={handleEdiClick}
          />
        )}
        {deleteItem && (
          <Button
            icon={`${process.env.PUBLIC_URL}/assets/images/trash-solid.svg`}
            onClick={handleDeleteClick}
          />
        )}
      </td>
    </tr>
  );
};

export default Row;
