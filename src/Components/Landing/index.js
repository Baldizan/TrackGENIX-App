import styles from './landing.module.css';

const Landing = () => {
  return (
    <section className={styles.sectionContainer}>
      <section className={styles.welcomeContainer}>
        <div className={styles.logoContainer}>
          <h2 className={styles.welcomeTitle}>Welcome to</h2>
          <img
            className={styles.logoLanding}
            src={`${process.env.PUBLIC_URL}/assets/images/logoTG.svg`}
          />
        </div>
      </section>
      <section className={styles.infoContainer}>
        <h3 className={styles.welcomeSubTitle}>Fueled by developers’ nightmares</h3>
        <p className={styles.welcomeParagraph}>
          GigaTech Software Solutions SA is an IT services, consulting and business solutions
          organization that has been partnering with many of the world’s largest businesses during
          their digital transformation; assisting, across a vast ecosystem of expertise, to drive
          real growth, drawing on the combined power of experience and contextual knowledge.
        </p>
        <img
          className={styles.initialSectionImage}
          src={`${process.env.PUBLIC_URL}/assets/images/welcome-landing.png`}
        />
      </section>
    </section>
  );
};

export default Landing;
