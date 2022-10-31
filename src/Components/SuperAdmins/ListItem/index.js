import styles from './listItem.module.css';

const ListItem = ({ listItem, id, state, changeState, setId }) => {
  console.log('desde listItem', id);
  return (
    <tr key={id}>
      <td>{listItem.name}</td>
      <td>{listItem.email}</td>
      <td>
        <a href={'#'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/icon-edit.svg`}
          />
        </a>
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
