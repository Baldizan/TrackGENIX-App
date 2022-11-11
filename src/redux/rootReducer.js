import { combineReducers } from 'redux';

import employees from './Employees/reducer';
import timesheets from './TimeSheets/reducer';
import admins from './Admins/reducer';
import superAdmins from './SuperAdmins/reducer';
import projects from './Projects/reducer';
import tasks from './Tasks/reducer';

const rootReducer = combineReducers({
  employees,
  timesheets,
  admins,
  superAdmins,
  projects,
  tasks
});

export default rootReducer;
