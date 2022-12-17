import styles from './landing.module.css';

const Landing = () => {
  return (
    <section className={styles.container}>
      <section className={styles.welcomeContainer}>
        <div className={styles.logoContainer}>
          <h2 className={styles.welcomeTitle}>Welcome to</h2>
          <img
            className={styles.logoLanding}
            src={`${process.env.PUBLIC_URL}/assets/images/logoTG.svg`}
          />
        </div>
        <h3 className={styles.welcomeSubTitle}>By GigaTech Software Solutions SA</h3>
      </section>
      <p className={styles.welcomeParagraph}>
        GigaTech Software Solutions SA provides software development services. Trackgenix was
        developed in order to facilitate the Workload registration for companies to enhance their
        performance, providing the required tools to track Working Hours, manage Projects, Employees
        and their respective roles and tasks.
      </p>
      <img
        className={styles.REVISAR}
        src={`${process.env.PUBLIC_URL}/assets/images/welcome-landing.png`}
      />
    </section>
  );
};

export default Landing;
