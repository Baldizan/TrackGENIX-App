import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmins from './List';
import ModalDelete from './Modal';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
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
      .then((json) => setSuperAdmins(json.data));
  }, []);

  const deleteSuperAdmin = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== id)]);
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
        superAdmins={superAdmins}
        setSuperAdmins={setSuperAdmins}
        onDeleteClick={handleDeleteClick}
        modal={modal}
        setModal={setModal}
        id={id}
        setId={setId}
      />
      <ModalDelete
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
