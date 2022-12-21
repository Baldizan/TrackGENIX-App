import LoginPage from '../pageobjects/login.page';
import AdminPage from '../pageobjects/admin';

describe('My Login application', () => {
  beforeAll('Navigate to URL', () => {
    browser.url('https://marta-a-trackgenix-app.vercel.app');
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
      'Test Project',
      'Random Client',
      'This is a test project',
      '21/12/2022',
      '02/02/2023',
      'Active',
      'Emily Smith',
      'Victoria Diaz',
      'DEV',
      '10'
    );
    await AdminPage.assignButton.click();
    await AdminPage.submitButton.click();
  });
  it('should inactive a project', async () => {
    await AdminPage.actButton.click();
    await AdminPage.confirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.confirmActButton.click();
    await AdminPage.closeConfirmActButton.waitForDisplayed({ timeout: 2000 });
    await AdminPage.closeConfirmActButton.click();
  });
});
