import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [selectedSuperAdmin, saveSelection] = useState({});
  const [showModal, saveShowModal] = useState(false);
  const headers = ['name', 'lastName', 'email'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/Super-admins`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmins(response.data);
      });
  }, []);

  const deleteSuperAdmin = async (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/Super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins(superAdmins.filter((superAdmins) => superAdmins._id !== id));
  };

  const handleDelete = (superAdmins) => {
    saveSelection({ id: superAdmins._id, name: superAdmins.name });
    saveShowModal(true);
  };

  const editSuperAdmin = (id) => {
    window.location.assign(`/Super-admins/form?id=${id}`);
  };

  return (
    <section className={styles.container}>
      <Modal
        heading={showModal}
        asdas={editSuperAdmin}
        setModalDisplay={deleteSuperAdmin}
        theme={selectedSuperAdmin}
      />
      <a href="/employees/form" className={styles.button}>
        Add new SuperAdmin +
      </a>
      <Table
        data={superAdmins.map((row) => ({ ...row, project: row.project?.name }))}
        headers={headers}
        editItem={editSuperAdmin}
        deleteItem={handleDelete}
      />
    </section>
  );
};

export default SuperAdmins;
