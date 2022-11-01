import styles from './projects.module.css';

function ProjectsForm() {
  const editId = sessionStorage.getItem('editId');
  sessionStorage.removeItem('editId');

  if (editId) {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${editId}`)
      .then((response) => response.json())
      .then((response) => console.log(response.data));
  }
  return (
    <section className={styles.container}>
      <h2>Create or edit project.</h2>
    </section>
  );
}

export default ProjectsForm;
