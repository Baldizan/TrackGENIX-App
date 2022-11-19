import React from 'react';
import Home from '../Home/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/form.js';
import SuperAdmins from '../SuperAdmins/index';
import FormSuperAdmins from '../SuperAdmins/Form';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/TasksForm';
import TimeSheets from '../TimeSheets';
import TimeSheetsForm from '../TimeSheets/TimeSheetsForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeeHome from '../Employee/Home';
import EmployeeProjects from '../Employee/Projects';
import EmployeeTimesheets from '../Employee/Timesheets';
import EmployeeProfile from '../Employee/Profile';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/employee/home">
        <EmployeeHome />
      </Route>
      <Route path="/employee/projects">
        <EmployeeProjects />
      </Route>
      <Route path="/employee/time-sheets">
        <EmployeeTimesheets />
      </Route>
      <Route path="/employee/profile">
        <EmployeeProfile />
      </Route>
      <Route exact path="/admins">
        <Admins />
      </Route>
      <Route path="/admins/form">
        <AdminsForm />
      </Route>
      <Route exact path="/super-admins">
        <SuperAdmins />
      </Route>
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
