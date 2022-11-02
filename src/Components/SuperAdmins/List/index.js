import ListItem from '../ListItem';
import styles from './list.module.css';

const ListSuperAdmins = ({ superAdmins, setModal, setId }) => {
  return (
    <div className={styles.container}>
      <a href={'/super-admins/form'} rel="noreferrer">
        <button className={styles.btnAdd}>Add Super Admin</button>
      </a>
      <table>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="email">Email</th>
            <th id="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((item) => (
            <ListItem
              id={item._id}
              key={item._id}
              listItem={item}
              setModal={setModal}
              setId={setId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListSuperAdmins;
