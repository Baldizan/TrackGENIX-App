import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ list, deleteItem }) => {
  console.log('lista componente list', list);

  return (
    <section className="flex-container">
      <table>
        <thead className="thead">
          <tr className="space-between">
            <th className="th" id="projectName">
              Project Name
            </th>
            <th id="task">Task</th>
            <th id="employee">employee</th>
            <th id="description">Description</th>
            <th id="date">Date</th>
            <th id="hours">Hours</th>
          </tr>
        </thead>
        {list.map((item) => (
          <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
        ))}
      </table>
    </section>
  );
};

export default List;
