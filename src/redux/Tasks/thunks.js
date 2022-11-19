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

const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
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

const postTask = (task) => {
  return (dispatch) => {
    dispatch(postTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        dispatch(deleteTaskSuccess(res.data));
        dispatch(getTasks());
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.message));
      });
  };
};

const putTask = (taskId, task) => {
  return (dispatch) => {
    dispatch(putTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          dispatch(putTaskError(json.message));
        } else {
          dispatch(putTaskSuccess(json.data));
        }
      })
      .catch((error) => {
        dispatch(putTaskError(error));
      });
  };
};

export { getTasks, postTask, deleteTask, putTask };
