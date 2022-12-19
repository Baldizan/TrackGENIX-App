import React, { lazy, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { tokenListener } from 'helpers/firebase';
import PrivateRoute from './PrivateRoute';
const Landing = lazy(() => import('Components/Landing'));
const SuperAdminHome = lazy(() => import('Components/Entities/SuperAdmin/Home'));
const SuperAdminAdmins = lazy(() => import('Components/Entities/SuperAdmin/Admins'));
const SuperAdminProfile = lazy(() => import('Components/Entities/SuperAdmin/Profile'));
const SuperAdminAdminsForm = lazy(() => import('Components/Entities/SuperAdmin/Admins/Form'));
const EmployeeHome = lazy(() => import('Components/Entities/Employee/Home'));
const EmployeeProjects = lazy(() => import('Components/Entities/Employee/Projects'));
const EmployeeTimesheets = lazy(() => import('Components/Entities/Employee/Timesheets'));
const EmployeeTimesheetsForm = lazy(() => import('Components/Entities/Employee/Timesheets/Form'));
const EmployeeProfile = lazy(() => import('Components/Entities/Employee/Profile'));
const AdminHome = lazy(() => import('Components/Entities/Admin/Home'));
const AdminEmployees = lazy(() => import('Components/Entities/Admin/Employees'));
const AdminEmployeesForm = lazy(() => import('Components/Entities/Admin/Employees/Form'));
const AdminProjects = lazy(() => import('Components/Entities/Admin/Projects'));
const AdminProjectsForm = lazy(() => import('Components/Entities/Admin/Projects/Form'));
const AdminTimesheets = lazy(() => import('Components/Entities/Admin/TimeSheets'));
const AdminTimesheetsForm = lazy(() =>
  import('Components/Entities/Admin/TimeSheets/TimeSheetsForm')
);
const AdminTasks = lazy(() => import('Components/Entities/Admin/Tasks'));
const AdminTasksForm = lazy(() => import('Components/Entities/Admin/Tasks/TasksForm'));
const AdminProfile = lazy(() => import('Components/Entities/Admin/Profile'));
const Login = lazy(() => import('Components/Auth/Login'));
const Register = lazy(() => import('Components/Auth/Register'));
const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <PrivateRoute exact path="/employee">
        <Redirect to="/employee/home" />
      </PrivateRoute>
      <PrivateRoute exact path="/employee/home" role="EMPLOYEE" component={EmployeeHome} />
      <PrivateRoute path="/employee/projects" role="EMPLOYEE" component={EmployeeProjects} />
      <PrivateRoute
        exact
        path="/employee/time-sheets"
        role="EMPLOYEE"
        component={EmployeeTimesheets}
      />
      <PrivateRoute
        path="/employee/time-sheets/form"
        role="EMPLOYEE"
        component={EmployeeTimesheetsForm}
      />
      <PrivateRoute path="/employee/profile" role="EMPLOYEE" component={EmployeeProfile} />
      <PrivateRoute exact path="/admin">
        <Redirect to="/admin/home" />
      </PrivateRoute>
      <PrivateRoute exact path="/admin/home" role="ADMIN" component={AdminHome} />
      <PrivateRoute exact path="/admin/employees" role="ADMIN" component={AdminEmployees} />
      <PrivateRoute path="/admin/employees/form" role="ADMIN" component={AdminEmployeesForm} />
      <PrivateRoute exact path="/admin/projects" role="ADMIN" component={AdminProjects} />
      <PrivateRoute path="/admin/projects/form" role="ADMIN" component={AdminProjectsForm} />
      <PrivateRoute exact path="/admin/time-sheets" role="ADMIN" component={AdminTimesheets} />
      <PrivateRoute path="/admin/time-sheets/form" role="ADMIN" component={AdminTimesheetsForm} />
      <PrivateRoute exact path="/admin/tasks" role="ADMIN" component={AdminTasks} />
      <PrivateRoute path="/admin/tasks/form" role="ADMIN" component={AdminTasksForm} />
      <PrivateRoute path="/admin/profile" role="ADMIN" component={AdminProfile} />
      <PrivateRoute exact path="/superadmin">
        <Redirect to="/superadmin/home" />
      </PrivateRoute>
      <PrivateRoute exact path="/superadmin/home" role="SUPERADMIN" component={SuperAdminHome} />
      <PrivateRoute
        exact
        path="/superadmin/admins"
        role="SUPERADMIN"
        component={SuperAdminAdmins}
      />
      <PrivateRoute
        path="/superadmin/admins/form"
        role="SUPERADMIN"
        component={SuperAdminAdminsForm}
      />
      <PrivateRoute path="/superadmin/profile" role="SUPERADMIN" component={SuperAdminProfile} />
    </Switch>
  );
};

export default Routes;
