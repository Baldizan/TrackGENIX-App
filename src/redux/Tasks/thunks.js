import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  postTaskPending,
  postTaskSuccess,
  postTaskError,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskError,
  putTaskPending,
  putTaskSuccess,
  putTaskError
} from './actions';

export const getTasks = (token) => {
  return (dispatch) => {
    dispatch(getTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'GET',
      headers: {
        token: token
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(getTasksError(json.message));
        } else {
          dispatch(getTasksSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(getTasksError(error.toString()));
      });
  };
};

export const postTask = (task, token) => {
  return (dispatch) => {
    dispatch(postTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify({
        description: task.description
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(postTaskError(json.message));
        } else {
          dispatch(postTaskSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(postTaskError(error.message));
      });
  };
};

export const deleteTask = (taskId, token) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    })
      .then((res) => {
        dispatch(deleteTaskSuccess(res.data));
        dispatch(getTasks(token));
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.message));
      });
  };
};

export const putTask = (taskId, task, token) => {
  return (dispatch) => {
    dispatch(putTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(putTaskError(json.message));
        } else {
          dispatch(putTaskSuccess(json.data));
          dispatch(getTasks(token));
        }
      })
      .catch((error) => {
        dispatch(putTaskError(error));
      });
  };
};
