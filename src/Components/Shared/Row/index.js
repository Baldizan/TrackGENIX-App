import React from 'react';
import Button from '../Button';
import styles from './row.module.css';

const Row = ({ listItems, deleteItem, editItem }) => {
  return (
    <tr className={styles.tr}>
      {listItems?.map((item, i) => (
        <td key={i} className={styles.td}>
          {item}
        </td>
      ))}
      <td className={styles.btnContainer}>
        {editItem && (
          <Button
            style={styles.btnEdit}
            icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
            onClick={editItem}
          />
        )}
        {deleteItem && (
          <Button
            icon={`${process.env.PUBLIC_URL}/assets/images/trash-solid.svg`}
            onClick={deleteItem}
          />
        )}
      </td>
    </tr>
  );
};

export default Row;
