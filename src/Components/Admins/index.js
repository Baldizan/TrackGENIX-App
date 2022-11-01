import styles from './admins.module.css';
import React, { useState, useEffect } from 'react';
import Modal from './modal';

function Admins() {
  const [admins, saveAdmins] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [rowId, setRowId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const deleteAdmin = (adminId) => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'DELETE'
    });
    const updatedAdminList = admins.filter((admin) => admin._id !== adminId);
    saveAdmins(updatedAdminList);
  };

  return (
    <section className={styles.container}>
      <h2>Admin list</h2>
      <button>Add new admin +</button>
      <table className={styles.table}>
        <col span="5" className={styles.columns} />
        <thead className={styles.table__head}>
          <tr>
            <th id="name">Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {admins.map((admin) => {
            return (
              <tr className={styles.table__row} key={admin._id}>
                <td className={styles.table__cell} key={admin.name}>
                  {admin.name}
                </td>
                <td className={styles.table__cell} key={admin.lastName}>
                  {admin.lastName}
                </td>
                <td className={styles.table__cell} key={admin.email}>
                  {admin.email}
                </td>
                <td className={styles.table__cell}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      setModalDisplay(true);
                      setRowId(admin._id);
                    }}
                  >
                    <img
                      className={styles.actionIcon}
                      src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
                    />
                  </button>
                </td>
                <td className={styles.table__cell}>
                  <button className={styles.button}>
                    <img
                      className={styles.actionIcon}
                      src={`${process.env.PUBLIC_URL}/assets/images/edit.png`}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalDisplay ? (
        <Modal
          heading="Are you sure?"
          contentMessage="Do you really want to delete this admin? This process cannot be undone"
          setModalDisplay={setModalDisplay}
          cancelButton="Cancel"
          confirmButton="Delete"
          reqFunction={() => {
            deleteAdmin(rowId);
            setModalDisplay(false);
          }}
        />
      ) : null}
    </section>
  );
}

export default Admins;
