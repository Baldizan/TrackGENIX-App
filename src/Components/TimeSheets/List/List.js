import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './List.module.css';
import ListItem from '../ListItem/ListItem';
import Button from '../../Shared/Button';

const List = ({ list, deleteItem }) => {
  const [displayRange, setDisplayRange] = useState({ x: 0, y: 5, z: 0 });
  const history = useHistory();

  return (
    <section className={styles.container}>
      <Button label={'Add new task +'} onClick={() => history.push('/time-sheets/form')} />
      <table>
        <thead className={[styles.thead, styles.spaceBetween]}>
          <tr>
            <th id="projectName">Project Name</th>
            <th id="task">Task</th>
            <th id="employee">employee</th>
            <th id="description">Description</th>
            <th id="date">Date</th>
            <th id="hours">Hours</th>
          </tr>
        </thead>
        <tbody>
          {list.slice(displayRange.x, displayRange.y).map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
      <div className={styles.nav}>
        <Button
          onClick={() =>
            setDisplayRange({ x: displayRange.x - 5, y: displayRange.y - 5, z: displayRange.z - 1 })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-left-solid.svg`}
          hidden={displayRange.x === 0}
        />
        <p>{displayRange.z}</p>
        <Button
          onClick={() =>
            setDisplayRange({ x: displayRange.x + 5, y: displayRange.y + 5, z: displayRange.z + 1 })
          }
          icon={`${process.env.PUBLIC_URL}/assets/images/angle-right-solid.svg`}
          hidden={list.slice(displayRange.x + 5, displayRange.y + 5).length === 0}
        />
      </div>
    </section>
  );
};

export default List;
