import {
  getTimeSheetsError,
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending,
  deleteTimeSheetSuccess
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
