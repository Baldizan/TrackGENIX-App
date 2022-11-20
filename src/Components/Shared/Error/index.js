import styles from './error.module.css';

const Error = ({ text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`${process.env.PUBLIC_URL}/assets/images/error.svg`} />
      <div>
        <h2>Whoops... It looks like a monster ate your file!</h2>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Error;
