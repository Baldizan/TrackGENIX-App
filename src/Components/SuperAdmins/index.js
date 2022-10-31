import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import ListSuperAdmin from './List';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((res) => res.json())
      .then((json) => setSuperAdmins(json.data));
  }, []);
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <ListSuperAdmin superAdmin={superAdmins} setSuperAdmins={setSuperAdmins} />
    </section>
  );
}

export default SuperAdmins;
