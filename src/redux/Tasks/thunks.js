import { getTasksError, getTasksPending, getTasksSuccess } from './actions';

export const getTasks = () => {
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
