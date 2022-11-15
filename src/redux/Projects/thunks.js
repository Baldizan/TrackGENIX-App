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
  return (dispatch) => {
    dispatch(postProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        startDate: project.startDate.slice(0, 10),
        endDate: project.endDate.slice(0, 10),
        clientName: project.clientName,
        active: project.active,
        employees: project.employees
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          dispatch(postProjectSuccess(json.data));
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

const putProject = (projectId, project) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (!json.error) {
          dispatch(putProjectSuccess(json.data));
        } else {
          dispatch(putProjectError(json.message));
        }
      });
  };
};

export { getProjects, postProject, deleteProject, putProject };
