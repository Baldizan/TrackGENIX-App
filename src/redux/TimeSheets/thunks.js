import {
  getTimeSheetsError,
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending,
  deleteTimeSheetSuccess,
  postTimeSheetError,
  postTimeSheetPending,
  postTimeSheetSuccess,
  putTimeSheetError,
  putTimeSheetPending,
  putTimeSheetSuccess
} from './actions';

export const getTimeSheets = (token, userId) => {
  return async (dispatch) => {
    dispatch(getTimeSheetsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/timesheets${userId ? `/?employee=${userId}` : ''}`,
        {
          headers: {
            token: token
          }
        }
      );
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      } else {
        dispatch(getTimeSheetsSuccess(json.data));
      }
    } catch (error) {
      dispatch(getTimeSheetsError(error.toString()));
    }
  };
};

export const deleteTimeSheet = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      } else {
        dispatch(deleteTimeSheetSuccess(id));
      }
    } catch (error) {
      dispatch(deleteTimeSheetError(error.toString()));
    }
  };
};

export const addTimeSheet = (data, token) => {
  return async (dispatch) => {
    dispatch(postTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: token
        },
        body: JSON.stringify({
          project: data.project,
          task: data.task,
          employee: data.employee,
          description: data.description,
          date: data.date,
          hours: data.hours
        })
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      } else {
        dispatch(postTimeSheetSuccess(json.data, json.message));
      }
    } catch (error) {
      dispatch(postTimeSheetError(error.toString()));
    }
  };
};

export const editTimeSheet = (id, data, token) => {
  return async (dispatch) => {
    dispatch(putTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          token: token
        },
        body: JSON.stringify({
          project: data.project,
          task: data.task,
          employee: data.employee,
          description: data.description,
          date: data.date,
          hours: data.hours
        })
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      } else {
        dispatch(putTimeSheetSuccess(json.data, json.message));
      }
    } catch (error) {
      dispatch(putTimeSheetError(error.toString()));
    }
  };
};
