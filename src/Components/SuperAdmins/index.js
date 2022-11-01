import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmins from './List';
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

  const deleteSuperAdmin = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== id)]);
    setModal(false);
  };
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <ListSuperAdmins
        superAdmins={superAdmins}
        setSuperAdmins={setSuperAdmins}
        deleteSuperAdmin={deleteSuperAdmin}
        onDeleteClick={handleDeleteClick}
        modal={modal}
        setModal={setModal}
        id={id}
        setId={setId}
      />
      <ModalWarning modal={modal} setModal={setModal} deleteSuperAdmin={deleteSuperAdmin} />
    </section>
  );
}

export default SuperAdmins;
