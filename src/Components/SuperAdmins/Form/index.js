import { useEffect, useState } from 'react';
import styles from './form.module.css';
import ModalWarning from '../Modal';

const FormSuperAdmin = () => {
  const paramsURL = new URLSearchParams(window.location.search);
  const userId = paramsURL.get('id');
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  useEffect(async () => {
    if (userId) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${userId}`);
        const data = await res.json();
        setUserInput({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const editSuperAdmin = async (userId) => {
    console.log('userId de Form', userId);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userInput.name,
          lastName: userInput.lastName,
          email: userInput.email,
          password: userInput.password
        })
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      setMessage(error);
    }
  };

  const addSuperAdmin = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      });
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setTitleModal('Edit Super Admins');
    }
    if (userInput.length > 0) {
      alert('Super Admins successfully');
    } else {
      alert('Super Admins cannot be empty');
    }
  };
  return (
    <section className={styles.container}>
      <h1>Form</h1>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={userInput.name}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  name: e.target.value
                });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={userInput.lastName}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  lastName: e.target.value
                });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              value={userInput.email}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  email: e.target.value
                });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={userInput.password}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  password: e.target.value
                });
              }}
              required
            />
          </div>
          <button
            type="submit"
            onClick={userId ? () => editSuperAdmin(userId) : () => addSuperAdmin()}
          >
            Save
          </button>
        </form>
        <a href={'http://localhost:3000/super-admins'}>
          <button type="text">Cancel</button>
        </a>
      </div>
      <ModalWarning modal={modal} setModal={setModal} message={message} titleModal={titleModal} />
    </section>
  );
};

export default FormSuperAdmin;
