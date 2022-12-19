import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from 'redux/Admins/thunks';
import styles from './admins.module.css';
import Table from 'Components/Shared/Table';
import Error from 'Components/Shared/Error';
import Loader from 'Components/Shared/Loader';

const Admins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: adminsArray, isPending, error } = useSelector((state) => state.admins);
  const headers = { name: 'Name', lastName: 'Last Name', email: 'Email', status: 'Status' };
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getAdmins(token));
  }, []);

  const addEditAdmin = (item) => {
    history.push(`/superadmin/admins/form`, item);
  };

  const adminsRows = adminsArray?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive'
  }));

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {!isPending && !error && (
        <Table
          data={adminsRows}
          headers={headers}
          editItem={addEditAdmin}
          title={'Admins'}
          addRedirectLink={'/superadmin/admins/form'}
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      )}
      {error && <Error text={error} />}
    </section>
  );
};

export default Admins;
