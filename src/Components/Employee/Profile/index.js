import Form from 'Components/Shared/Form';
import { Input } from 'Components/Shared/Input';
import styles from './profile.module.css';

const EmployeeProfile = () => {
  return (
    <section className={styles.container}>
      <Form title="My profile">
        <Input placeholder="Edit your user name" name="userName" title="User name" required />
        <Input placeholder="Edit your email" name="mail" title="Mail" required />
        <Input placeholder="Edit your password" name="password" title="Password" required />
        <Input
          placeholder="Repeat password"
          name="repeatPassword"
          title="Repeat password"
          required
        />
      </Form>
    </section>
  );
};

export default EmployeeProfile;
