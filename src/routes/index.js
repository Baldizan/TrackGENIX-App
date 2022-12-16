import React, { lazy, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { tokenListener } from 'helpers/firebase';
import PrivateRoute from './PrivateRoute';
const Home = lazy(() => import('Components/Home'));
const Admins = lazy(() => import('Components/Entities/SuperAdmin/Admins'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Projects'));
const ProjectsForm = lazy(() => import('Components/Projects/Form'));
// const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const FormSuperAdmins = lazy(() => import('Components/SuperAdmins/Form'));
const Tasks = lazy(() => import('Components/Tasks'));
const TasksForm = lazy(() => import('Components/Tasks/TasksForm'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/TimeSheetsForm'));
const SuperAdminHome = lazy(() => import('Components/Entities/SuperAdmin/Home'));
const SuperAdminProfile = lazy(() => import('Components/Entities/SuperAdmin/Profile'));
const AdminsForm = lazy(() => import('Components/Entities/SuperAdmin/Admins/Form'));
const EmployeeHome = lazy(() => import('Components/Entities/Employee/Home'));
const EmployeeProjects = lazy(() => import('Components/Entities/Employee/Projects'));
const EmployeeTimesheets = lazy(() => import('Components/Entities/Employee/Timesheets'));
const EmployeeTimesheetsForm = lazy(() => import('Components/Entities/Employee/Timesheets/Form'));
const EmployeeProfile = lazy(() => import('Components/Entities/Employee/Profile'));
const Login = lazy(() => import('Components/Auth/Login'));
const Register = lazy(() => import('Components/Auth/Register'));
const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Home />
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
      <PrivateRoute exact path="/superadmin">
        <Redirect to="/superadmin/home" />
      </PrivateRoute>
      <PrivateRoute exact path="/superadmin/home" role="SUPERADMIN" component={SuperAdminHome} />
      <PrivateRoute exact path="/superadmin/admins" role="SUPERADMIN" component={Admins} />
      <PrivateRoute path="/superadmin/admins/form" role="SUPERADMIN" component={AdminsForm} />
      <PrivateRoute path="/superadmin/profile" role="SUPERADMIN" component={SuperAdminProfile} />
      <Route path="/super-admins/form">
        <FormSuperAdmins />
      </Route>
      <Route exact path="/employees">
        <Employees />
      </Route>
      <Route path="/employees/form">
        <EmployeesForm />
      </Route>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route path="/projects/form">
        <ProjectsForm />
      </Route>
      <Route exact path="/time-sheets">
        <TimeSheets />
      </Route>
      <Route path="/time-sheets/form">
        <TimeSheetsForm />
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
      <Route path="/tasks/form">
        <TasksForm />
      </Route>
    </Switch>
  );
};

export default Routes;
