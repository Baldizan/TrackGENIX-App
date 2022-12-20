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

const getProjects = (token, queryKey, queryValue) => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(
      `${process.env.REACT_APP_API_URL}/projects${
        queryKey && queryValue ? `/?${queryKey}=${queryValue}` : ''
      }`,
      {
        headers: {
          token: token
        }
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          dispatch(getProjectsError(json.message));
        } else {
          dispatch(getProjectsSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

const postProject = (project, token) => {
  return (dispatch) => {
    dispatch(postProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        projectManager: project.projectManager,
        clientName: project.clientName,
        active: project.active,
        employees: project.employees
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(postProjectError(json.message));
        } else {
          dispatch(postProjectSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(postProjectError(error.message));
      });
  };
};

const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        dispatch(deleteProjectSuccess(res.data));
        dispatch(getProjects());
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.message));
      });
  };
};

const putProject = (projectId, data, token) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(putProjectError(json.message));
        } else {
          dispatch(putProjectSuccess(json.data));
          dispatch(getProjects(token));
        }
      })
      .catch((error) => {
        dispatch(putProjectError(error));
      });
  };
};

export { getProjects, postProject, deleteProject, putProject };
