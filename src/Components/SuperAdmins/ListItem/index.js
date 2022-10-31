import styles from './listItem.module.css';

const ListItem = ({ listItem, onDeleteClick, id }) => {
  const handleDeleteClick = () => {
    onDeleteClick();
  };
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
            handleDeleteClick(listItem.id);
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
