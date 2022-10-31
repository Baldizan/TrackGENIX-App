import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './List';
import ModalWarning from './Modal';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);

  const handleDeleteClick = () => {
    setModal(true);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((res) => res.json())
      .then((json) => setSuperAdmins(json.data));
  }, []);

  const deleteSA = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== id)]);
    setModal(false);
  };
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <ListSuperAdmin
        superAdmin={superAdmins}
        setSuperAdmins={setSuperAdmins}
        deleteSA={deleteSA}
        onDeleteClick={handleDeleteClick}
        state={modal}
        changeState={setModal}
        id={id}
        setId={setId}
      />
      <ModalWarning state={modal} changeState={setModal} deleteSA={deleteSA} />
    </section>
  );
}

export default SuperAdmins;
