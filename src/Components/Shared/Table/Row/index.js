import React from 'react';
import styles from './row.module.css';
import Button from '../../Button';

const Row = ({ headers, rowItem, deleteItem, editItem }) => {
  const handleDeleteClick = () => {
    deleteItem(rowItem);
  };
  const handleEditClick = () => {
    editItem(rowItem);
  };
  return (
    <tr className={styles.tr}>
      {headers?.map((prop, i) => (
        <td key={i} className={styles.td}>
          {rowItem[prop]}
        </td>
      ))}
      <td className={(styles.btnContainer, styles.td)}>
        {editItem && (
          <Button
            style={styles.btnEdit}
            icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
            onClick={handleEditClick}
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
