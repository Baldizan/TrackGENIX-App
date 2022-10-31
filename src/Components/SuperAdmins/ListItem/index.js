import styles from './listItem.module.css';

const ListItem = ({ listItem, id, state, changeState, setId }) => {
  return (
    <tr key={id}>
      <td>{listItem.name}</td>
      <td>{listItem.email}</td>
      <td>
        <button>
          <a href={`super-admins/form?id=${listItem._id}`} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/icon-edit.svg`}
            />
          </a>
        </button>
        <button
          onClick={() => {
            setId(id);
            changeState(!state);
          }}
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/icon-delete.svg`}
          />
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
