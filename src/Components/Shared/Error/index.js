import styles from './error.module.css';

const Error = ({ text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`${process.env.PUBLIC_URL}/assets/images/error.svg`} />
      <div>
        <h2>Whoops... It looks like a monster ate your file!</h2>
        <p className={styles.text}>
          Error&nbsp;code:&nbsp;
          {text
            .split('')
            .reduce((a, b) => {
              a = (a << 5) - a + b.charCodeAt(0);
              return a & a;
            }, 0)
            .toString(16)}
        </p>
      </div>
    </div>
  );
};

export default Error;
