import React from 'react';
import Button from '../../Button';
import styles from './row.module.css';

const Row = ({ headers, rowItem, deleteItem, editItem, editStatus }) => {
  return (
    <tr className={styles.tr}>
      {headers?.map((header, index) => (
        <td
          key={index}
          className={`
          ${styles.td}
          ${
            header.toLowerCase() === 'status'
              ? rowItem[header].toLowerCase() === 'active'
                ? styles.active
                : styles.inactive
              : null
          }
        `}
        >
          {rowItem[header]}
        </td>
      ))}
      {editItem || deleteItem ? (
        <td className={styles.td}>
          <span className={styles.btnContainer}>
            {deleteItem && (
              <Button
                icon={`${process.env.PUBLIC_URL}/assets/images/trash-solid.svg`}
                onClick={deleteItem}
              />
            )}
            {editStatus && (
              <Button
                icon={
                  headers.includes('status')
                    ? rowItem['status'].toLowerCase() === 'active'
                      ? `${process.env.PUBLIC_URL}/assets/images/circle-xmark-solid.svg`
                      : `${process.env.PUBLIC_URL}/assets/images/circle-check-solid.svg`
                    : null
                }
                onClick={editStatus}
              />
            )}
            {editItem && (
              <Button
                icon={`${process.env.PUBLIC_URL}/assets/images/pen-to-square-solid.svg`}
                onClick={editItem}
              />
            )}
          </span>
        </td>
      ) : null}
    </tr>
  );
};

export default Row;
