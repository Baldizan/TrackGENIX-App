import {
  getEmployeesError,
  getEmployeesPending,
  getEmployeesSuccess,
  deleteEmployeeError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  putEmployeePending,
  putEmployeeSuccess,
  putEmployeeError,
  postEmployeePending,
  postEmployeeSuccess,
  postEmployeeError
} from './actions';

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
      .then(() => {
        dispatch(getEmployees());
      })
      .catch((error) => {
        dispatch(deleteEmployeeError(error.toString()));
      });
  };
};

export const putEmployee = (id, data) => {
  return (dispatch) => {
    dispatch(putEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        project: data.project,
        active: data.active
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          dispatch(putEmployeeError(json.message));
        } else {
          dispatch(putEmployeeSuccess());
          dispatch(getEmployees());
        }
      })
      .catch((error) => {
        dispatch(putEmployeeError(error.message));
      });
  };
};

export const postEmployee = (data) => {
  return (dispatch) => {
    dispatch(postEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        project: data.project,
        active: data.active
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          dispatch(postEmployeeError(json.message));
        } else {
          dispatch(postEmployeeSuccess());
          dispatch(getEmployees());
        }
      })
      .catch((error) => {
        dispatch(postEmployeeError(error.message));
      });
  };
};
