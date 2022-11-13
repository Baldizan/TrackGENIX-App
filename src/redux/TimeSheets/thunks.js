import { getTimesheetsError, getTimesheetsPending, getTimesheetsSuccess } from './action';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTimesheetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTimesheetsError(error.toString()));
      });
  };
};
