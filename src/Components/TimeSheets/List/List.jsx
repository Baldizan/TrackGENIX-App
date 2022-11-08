import React from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

const List = ({ list, deleteItem }) => {
  const handleAdd = () => {
    sessionStorage.setItem('action', 'add');
    window.location.href = '/time-sheets/form';
  };

  return (
    <section className="flex-container">
      <table>
        <thead className="thead">
          <tr className="space-between">
            <th id="projectName">Project Name</th>
            <th id="task">Task</th>
            <th id="employee">employee</th>
            <th id="description">Description</th>
            <th id="date">Date</th>
            <th id="hours">Hours</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
      <button className="btn-add" href="/time-sheets/form" onClick={handleAdd}>
        Add
      </button>
    </section>
  );
};

export default List;