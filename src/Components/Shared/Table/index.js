import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './table.module.css';
import Row from './Row';
import Button from '../Button';

const Table = ({ data, headers, editItem, deleteItem, addRedirectLink, title, itemsPerPage }) => {
  const [displayRange, setDisplayRange] = useState({
    x: 0,
    y: itemsPerPage,
    z: 0
  });
  const history = useHistory();

  return (
    <div className={styles.container}>
      {title || addRedirectLink ? (
        <header className={styles.header}>
          {title ? <h2>{title}</h2> : null}
          {addRedirectLink ? (
            <Button
              style={styles.addButton}
              label={`Add new +`}
              onClick={() => history.push(addRedirectLink)}
            />
          ) : null}
        </header>
      ) : null}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {Object.values(headers).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            .map((item) => (
              <Row
                key={item._id}
                rowItem={item}
                headers={Object.keys(headers)}
                editItem={() => editItem(item)}
                deleteItem={() => deleteItem(item)}
              />
            ))
            .slice(displayRange.x, displayRange.y)}
        </tbody>
      </table>
      {itemsPerPage ? (
        <div className={styles.nav}>
          <Button
            onClick={() =>
              setDisplayRange({
                x: displayRange.x - itemsPerPage,
                y: displayRange.y - itemsPerPage,
                z: displayRange.z - 1
              })
            }
            icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
            hidden={displayRange.z === 0}
          />
          <p>{displayRange.z}</p>
          <Button
            onClick={() =>
              setDisplayRange({
                x: displayRange.x + itemsPerPage,
                y: displayRange.y + itemsPerPage,
                z: displayRange.z + 1
              })
            }
            icon={`${process.env.PUBLIC_URL}/assets/images/angle-right-solid.svg`}
            hidden={
              data.slice(displayRange.x + itemsPerPage, displayRange.y + itemsPerPage).length === 0
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
