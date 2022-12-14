import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './table.module.css';
import Row from './Row';
import Button from '../Button';
import { Input } from '../Input';

const Table = ({
  data,
  headers,
  editItem,
  deleteItem,
  addRedirectLink,
  title,
  itemsPerPage,
  isSearchEnabled
}) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [displayRange, setDisplayRange] = useState({
    x: 0,
    y: itemsPerPage,
    z: 1
  });
  const headersKeys = Object.keys(headers);
  const headersValues = Object.values(headers);
  const displayData = !isSearchEnabled
    ? data
    : data?.filter((item) =>
        headersKeys.some((key) => item[key].toString().toLowerCase().includes(query.toLowerCase()))
      );
  const navValidation = {
    back: displayRange.x === 0,
    forward:
      displayData?.slice(displayRange.x + itemsPerPage, displayRange.y + itemsPerPage).length === 0
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
          {addRedirectLink || isSearchEnabled ? (
            <div className={styles.utilities}>
              {addRedirectLink ? (
                <Button
                  style={styles.addButton}
                  label="Add new +"
                  onClick={() => history.push(addRedirectLink)}
                />
              ) : null}
              {isSearchEnabled ? (
                <Input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              ) : null}
            </div>
          ) : null}
        </header>
      ) : null}
      <div className={itemsPerPage ? styles.tableContainer : null}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {headersValues.map((header, index) => (
                <th key={index} className={styles.th}>
                  {header}
                </th>
              ))}
              {editItem || deleteItem ? <th className={styles.th}></th> : null}
            </tr>
          </thead>
          <tbody>
            {data &&
              displayData
                .map((item, index) => (
                  <Row
                    key={index}
                    rowItem={item}
                    headers={headersKeys}
                    editItem={editItem ? () => editItem(item) : null}
                    deleteItem={deleteItem ? () => deleteItem(item) : null}
                  />
                ))
                .slice(displayRange.x, displayRange.y)}
          </tbody>
        </table>
        {!data && <p className={styles.noDataMsg}>No data found</p>}
        {displayData && !displayData.length && <p className={styles.noDataMsg}>No results found</p>}
      </div>
      {itemsPerPage && displayData ? (
        <div className={styles.nav}>
          <Button
            style={styles.navButton}
            onClick={navOnClick.back}
            icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
            hidden={navValidation.back}
            disabled={navValidation.back}
          />
          {displayData.length > itemsPerPage ? (
            <p className={styles.page}>{displayRange.z}</p>
          ) : null}
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
