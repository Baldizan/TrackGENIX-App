import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  postProjectPending,
  postProjectSuccess,
  postProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError,
  putProjectPending,
  putProjectSuccess,
  putProjectError
} from './actions';
import { useHistory } from 'react-router-dom';

const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

const postProject = (project) => {
  const history = useHistory();
  return (dispatch) => {
    dispatch(postProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          dispatch(postProjectSuccess(json.data));
          history.push('/projects');
        } else {
          dispatch(postProjectError(json.message));
        }
      });
  };
};

const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(deleteProjectSuccess(res.data));
        return res.data;
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.message));
      });
  };
};

const putProject = (projectId) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    return (
      fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          putProjectSuccess({
            name: res.data.name,
            description: res.data.description,
            startDate: res.data.startDate.slice(0, 10),
            endDate: res.data.endDate.slice(0, 10),
            clientName: res.data.clientName,
            active: res.data.active,
            employees: res.data.employees
              .filter((e) => e.id && typeof e.id === 'object')
              .map((e) => ({ id: e.id._id, role: e.role, rate: e.rate }))
          });
        })
        // .then((res) => {
        //   dispatch(updateProjectSuccess(res.data));
        //   // dispatch(setModal(false));
        //   return res.data;
        // })
        .catch((error) => {
          dispatch(putProjectError(error.message));
        })
    );
  };
};

export { getProjects, postProject, deleteProject, putProject };
