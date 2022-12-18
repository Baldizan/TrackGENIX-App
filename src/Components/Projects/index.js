import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './projects.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';
import { getProjects, deleteProject } from 'redux/Projects/thunks';

const Projects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: projectsArray, isPending, error } = useSelector((state) => state.projects);
  const [modal, setModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [isModal, setFeedbackModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const [feedback, setFeedback] = useState({ heading: '', theme: '' });
  const [itemToDelete, setItemToDelete] = useState({});
  const headers = {
    name: 'Name',
    clientName: 'Client name',
    description: 'Description',
    startDateFormat: 'Start date',
    endDateFormat: 'End date',
    projectManager: 'Project Manager',
    employeesCmp: 'Employees',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  const projectColumns = projectsArray?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    startDateFormat: row.startDate.slice(0, 10),
    endDateFormat: row.endDate.slice(0, 10),
    projectManager: row.projectManager?.name + row.projectManager?.lastName,
    projectManagerId: row.projectManager?._id,
    employeesCmp: (
      <Button
        label="See employees"
        theme="primary"
        onClick={() => showEmployees(row.employees.filter((employee) => employee.id !== null))}
      />
    )
  }));

  const handleEdit = (item) => {
    history.push('/projects/form', {
      id: item._id,
      project: {
        name: item.name,
        clientName: item.clientName,
        description: item.description,
        active: item.active,
        startDate: item.startDate?.slice(0, 10),
        projectManager: item.projectManager,
        projectManagerId: item.projectManagerId,
        endDate: item.endDate?.slice(0, 10),
        employees: item.employees?.map((e) => ({
          employeeId: e.id?._id,
          role: e.role,
          rate: e.rate
        }))
      }
    });
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setModal(true);
  };

  const deleteItem = async () => {
    dispatch(deleteProject(itemToDelete._id));
    if (error) {
      setFeedback({ heading: `There was an error: ${error}`, theme: 'error' });
    } else {
      setFeedback({ heading: 'Project deleted', theme: 'success' });
    }
    setFeedbackModal(true);
  };

  const showEmployees = (employees) => {
    if (employees) {
      const projectEmployees = employees.map((employee) => ({
        name: employee.id.name + ' ' + employee.id.lastName,
        role: employee.role,
        rate: employee.rate
      }));
      setProjectEmployees(projectEmployees);
      setModalEmployee(true);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={`There has been an error: ${error}`} />}
      {!isPending && !error ? (
        <Table
          data={projectColumns}
          headers={headers}
          title="Projects"
          redirectLink="projects/form"
          editItem={handleEdit}
          deleteItem={handleDelete}
          itemsPerPage={5}
          isSearchEnabled={true}
        />
      ) : null}
      {modalEmployee && (
        <Modal setModalDisplay={setModalEmployee}>
          <div className={styles.employeesTableContainer}>
            <Table
              data={projectEmployees}
              headers={{ name: 'Employee', role: 'Role', rate: 'Rate' }}
              title="Project employees"
            />
          </div>
        </Modal>
      )}
      {!isPending && modal && (
        <Modal
          setModalDisplay={setModal}
          heading={`Are you sure you want to delete project ${itemToDelete.name}?`}
          theme="confirm"
          message="This change cannot be undone!"
          confirmFunction={deleteItem()}
        />
      )}
      {isModal && (
        <Modal
          setModalDisplay={setFeedbackModal}
          heading={feedback.heading}
          theme={feedback.theme}
        ></Modal>
      )}
    </section>
  );
};

export default Projects;
