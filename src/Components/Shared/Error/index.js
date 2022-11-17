import styles from './error.module.css';

const Error = ({ text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`${process.env.PUBLIC_URL}/assets/images/error.svg`} />
      <p className={styles.text}>{text}The employees were not found,The employees were not found</p>
    </div>
  );
};

export default Error;
