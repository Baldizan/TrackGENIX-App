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
    await AdminPage.inputProjectStatus.selectByAttribute('value', 'true');
    await AdminPage.inputProjectManager.selectByAttribute('value', '63867b81f5cc4addd0a9bc55');
    await AdminPage.inputProjectChooseEmployee.selectByAttribute(
      'value',
      '63867b9d47e43067d697fa2a'
    );
    await AdminPage.inputProjectChooseEmployeeRole.selectByAttribute('value', 'DEV');
    await AdminPage.assignButton.click();
    await AdminPage.inputProjectName.click();
    await AdminPage.submitButton.click();
    await AdminPage.confirmProjectCreationButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmProjectCreationButton.click();
  });
  /*it('should inactive a project', async () => {
    await AdminPage.actButton.click();
    await AdminPage.confirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmActButton.click();
    await AdminPage.closeConfirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.closeConfirmActButton.click();
  });*/
  it('should edit a project', async () => {
    await AdminPage.editProjectButton.click();
    await AdminPage.inputProjectName.waitForDisplayed({ timeout: 2000 });
    await AdminPage.inputProjectName.setValue('Innovation');
    await AdminPage.submitButton.click();
  });
});
