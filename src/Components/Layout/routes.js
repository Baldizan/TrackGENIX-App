import React from 'react';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/form.js';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import TimeSheetsForm from '../TimeSheets/TimeSheetsForm/TimeSheetsForm';
import FormSuperAdmins from '../SuperAdmins/Form';
import { Switch, Route, Redirect } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Home />
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
      <Route path="/tasks">
        <Tasks />
      </Route>
    </Switch>
  );
};

export default Routes;
