const LoginPage = require('../pageobjects/login.page');
const AdminPage = require('../pageobjects/admin');

describe('Admin Entity', () => {
  beforeAll('Navigate to URL', () => {
    browser.url('https://marta-a-trackgenix-app.vercel.app/login');
  });

  it('should login with valid credentials(admin)', async () => {
    await LoginPage.login('test1@admin.com', 'abcd1234');
  });

  it('should go to projects section and create a project', async () => {
    await AdminPage.projects.click();
    await AdminPage.addProject.waitForDisplayed({ timeout: 2000 });
    await AdminPage.addProject.click();
    await AdminPage.ProjectAddEmployee.click();
    await AdminPage.aProject(
      'Test',
      'Random Client',
      'This is a test project',
      '21/12/2022',
      '02/02/2023',
      '10'
    );
    await AdminPage.inputProjectStatus.selectByVisibleText('Active');
    await AdminPage.inputProjectManager.selectByAttribute('value', '63867b81f5cc4addd0a9bc55');
    await AdminPage.inputProjectChooseEmployee.selectByAttribute(
      'value',
      '63867b9d47e43067d697fa2a'
    );
    await AdminPage.inputProjectChooseEmployeeRole.selectByAttribute('value', 'DEV');
    await AdminPage.assignButton.click();
    await AdminPage.inputProjectName.click();
    await AdminPage.submitButton.click();
    await AdminPage.confirmCreationButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmCreationButton.click();
  });

  it('should inactive a project', async () => {
    await AdminPage.actButton.click();
    await AdminPage.confirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmActButton.click();
    await AdminPage.closeConfirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.closeConfirmActButton.click();
  });

  it('should edit a project', async () => {
    await AdminPage.editProjectButton.click();
    await AdminPage.inputProjectName.waitForDisplayed({ timeout: 2000 });
    await AdminPage.inputProjectName.setValue('Innovation');
    await AdminPage.submitButton.click();
  });

  it('should edit an employee', async () => {
    await AdminPage.employeesButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.employeesButton.click();
    await AdminPage.editEmployee.waitForDisplayed({ timeout: 2000 });
    await AdminPage.editEmployee.click();
    await AdminPage.numberInputEmployee.setValue('1234567891');
    await AdminPage.submitEmployee.click();
  });

  it('should active or inactive an employee', async () => {
    await AdminPage.employeesButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.employeesButton.click();
    await AdminPage.inactiveEmployee.waitForDisplayed({ timeout: 2000 });
    await AdminPage.inactiveEmployee.click();
    await AdminPage.confirmInactiveButton.click();
    await AdminPage.closeModalSuccess.click();
  });

  it('should go to timesheets and create one', async () => {
    await AdminPage.timesheetButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.timesheetButton.click();
    await AdminPage.createTimesheetButton.waitForDisplayed();
    await AdminPage.createTimesheetButton.click();
    await AdminPage.aTimesheet('This is a timesheet', '21/12/2022', '0');
    await AdminPage.employeeTimesheet.selectByVisibleText('Victoria Diaz');
    await AdminPage.projectTimesheet.selectByVisibleText('Innovate');
    await AdminPage.taskTimesheet.selectByVisibleText('Implement new functionalities');
    await AdminPage.descriptionTimesheet.click();
    await AdminPage.submitButton.click();
    await AdminPage.confirmCreationButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmCreationButton.click();
  });

  it('should delete a timesheet', async () => {
    await AdminPage.deleteTimesheetButton.click();
    await AdminPage.confirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmActButton.click();
    await AdminPage.closeConfirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.closeConfirmActButton.click();
  });

  it('should edit a timesheet', async () => {
    await AdminPage.editTimesheetButton.click();
    await AdminPage.hoursTimesheet.waitForDisplayed({ timeout: 2000 });
    await AdminPage.hoursTimesheet.setValue('5');
    await AdminPage.submitButton.click();
  });

  it('should go to tasks and create one', async () => {
    await AdminPage.tasksButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.tasksButton.click();
    await AdminPage.createTasksButton.waitForDisplayed();
    await AdminPage.createTasksButton.click();
    await AdminPage.descriptionTasks.setValue('Implement new functionalities');
    await AdminPage.submitButton.click({ x: 150 });
    await AdminPage.submitButton.click();
    await AdminPage.closeModalSuccess.click();
  });

  it('should edit a tasks', async () => {
    await AdminPage.editTasksButton.waitForDisplayed();
    await AdminPage.editTasksButton.click();
    await AdminPage.descriptionTasks.waitForDisplayed({ timeout: 2000 });
    await AdminPage.descriptionTasks.setValue('Modified task');
    await AdminPage.submitButton.click();
  });
});
