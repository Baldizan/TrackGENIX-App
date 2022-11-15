import { getEmployeesError, getEmployeesPending, getEmployeesSuccess } from './actions';
import { deleteEmployeeError, deleteEmployeePending, deleteEmployeeSuccess } from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteEmployeeSuccess());
      })
      .catch((error) => {
        dispatch(deleteEmployeeError(error.toString()));
      });
  };
};
