import ListItem from '../ListItem';
import styles from './list.module.css';

const ListSuperAdmins = ({ superAdmin, setModal, setId }) => {
  return (
    <div className={styles.container}>
      <a href={'/super-admins/form'} rel="noreferrer">
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
