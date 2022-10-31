import React from 'react';
import './ListItem.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };

  return (
    <tr className="space-between">
      <td>{listItem.project.name}</td>
      <td>{listItem.task.description}</td>
      <td>{listItem.description}</td>
      <td>{listItem.employee}</td>
      <td>{new Date(listItem.date).toLocaleDateString()}</td>
      <td>{listItem.hours}</td>
      <div>
        <button onClick={() => handleDelete()}>X</button>
      </div>
    </tr>
  );
};

export default ListItem;
