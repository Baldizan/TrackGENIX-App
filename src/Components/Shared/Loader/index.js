import styles from './loading.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
