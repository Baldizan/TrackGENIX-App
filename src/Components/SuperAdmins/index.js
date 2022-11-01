import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmins from './List';
import ModalWarning from './Modal';

const SuperAdmins = () => {
  const [superAdmin, setSuperAdmin] = useState([]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [id, setId] = useState(null);

  const handleDeleteClick = () => {
    setModal(true);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((res) => res.json())
      .then((json) => setSuperAdmin(json.data));
  }, []);

  const deleteSuperAdmin = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      setSuperAdmin([...superAdmin.filter((listItem) => listItem._id !== id)]);
      setModal(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setTitleModal('Edit Super Admins');
    }
  };
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <ListSuperAdmins
        superAdmin={superAdmin}
        setSuperAdmin={setSuperAdmin}
        onDeleteClick={handleDeleteClick}
        modal={modal}
        setModal={setModal}
        id={id}
        setId={setId}
      />
      <ModalWarning
        modal={modal}
        setModal={setModal}
        deleteSuperAdmin={deleteSuperAdmin}
        message={message}
        titleModal={titleModal}
      />
    </section>
  );
};

export default SuperAdmins;
