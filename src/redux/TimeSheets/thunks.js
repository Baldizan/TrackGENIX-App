import {
  getTimeSheetsError,
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending,
  deleteTimeSheetSuccess,
  postTimeSheetError,
  postTimeSheetPending,
  postTimeSheetSuccess
} from './actions';

export const getTimeSheets = () => {
  return async (dispatch) => {
    dispatch(getTimeSheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const json = await response.json();
      if (json.error) {
        dispatch(getTimeSheetsError(json.message));
      }
      dispatch(getTimeSheetsSuccess(json.data));
    } catch (error) {
      dispatch(getTimeSheetsError(error.toString()));
    }
  };
};

export const deleteTimeSheet = (id) => {
  return async (dispatch) => {
    dispatch(deleteTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      }
      dispatch(deleteTimeSheetSuccess(id));
    } catch (error) {
      dispatch(deleteTimeSheetError(error.toString()));
    }
  };
};

export const addTimeSheet = (data) => {
  return async (dispatch) => {
    dispatch(postTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.message);
      }
      dispatch(postTimeSheetSuccess(json.data, json.message));
    } catch (error) {
      dispatch(postTimeSheetError(error.toString()));
    }
  };
};
