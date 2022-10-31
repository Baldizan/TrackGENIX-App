import ListItem from '../ListItem';
import styles from './list.module.css';

const ListSuperAdmin = ({ superAdmin, onDeleteClick }) => {
  return (
    <div className={styles.container}>
      <a href={'/addNewSuperAdmin'} rel="noreferrer">
        <img
          className={styles.btnAdd}
          target={'_blank'}
          src={`${process.env.PUBLIC_URL}/assets/images/btn-add.svg`}
        />
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
          {superAdmin.map((item) => (
            <ListItem id={item._id} key={item._id} listItem={item} onDeleteClick={onDeleteClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListSuperAdmin;
