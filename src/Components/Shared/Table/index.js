import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './table.module.css';
import Row from './Row';
import Button from '../Button';

const Table = ({ data, headers, editItem, deleteItem, addRedirectLink, title, itemsPerPage }) => {
  const [displayRange, setDisplayRange] = useState({
    x: 0,
    y: itemsPerPage,
    z: 1
  });
  const history = useHistory();
  const navValidation = {
    back: displayRange.x === 0,
    forward: data?.slice(displayRange.x + itemsPerPage, displayRange.y + itemsPerPage).length === 0
  };
  const navOnClick = {
    back: () =>
      setDisplayRange({
        x: displayRange.x - itemsPerPage,
        y: displayRange.y - itemsPerPage,
        z: displayRange.z - 1
      }),
    forward: () =>
      setDisplayRange({
        x: displayRange.x + itemsPerPage,
        y: displayRange.y + itemsPerPage,
        z: displayRange.z + 1
      })
  };

  return (
    <div className={styles.container}>
      {title || addRedirectLink ? (
        <header className={styles.header}>
          {title ? <h2>{title}</h2> : null}
          {addRedirectLink ? (
            <Button
              style={styles.addButton}
              label="Add new +"
              onClick={() => history.push(addRedirectLink)}
            />
          ) : null}
        </header>
      ) : null}
      <div className={itemsPerPage ? styles.tableContainer : null}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {Object.values(headers).map((header, index) => (
                <th key={index} className={styles.th}>
                  {header}
                </th>
              ))}
              {editItem || deleteItem ? <th className={styles.th}></th> : null}
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .map((item, index) => (
                  <Row
                    key={index}
                    rowItem={item}
                    headers={Object.keys(headers)}
                    editItem={editItem ? () => editItem(item) : null}
                    deleteItem={deleteItem ? () => deleteItem(item) : null}
                  />
                ))
                .slice(displayRange.x, displayRange.y)}
          </tbody>
        </table>
      </div>
      {itemsPerPage && data ? (
        <div className={styles.nav}>
          <Button
            style={styles.navButton}
            onClick={navOnClick.back}
            icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
            hidden={navValidation.back}
            disabled={navValidation.back}
          />
          {data.length > itemsPerPage ? <p className={styles.page}>{displayRange.z}</p> : null}
          <Button
            style={styles.navButton}
            onClick={navOnClick.forward}
            icon={`${process.env.PUBLIC_URL}/assets/images/angle-right-solid.svg`}
            hidden={navValidation.forward}
            disabled={navValidation.forward}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
