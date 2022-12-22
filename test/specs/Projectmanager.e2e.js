const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home');
const LandingPage = require('../pageobjects/landing');
const projectsPage = require('../pageobjects/projects.page');

describe('Project Manager e2e', () => {
    beforeAll('Navigate to URL', () => {
      browser.url('https://marta-a-trackgenix-app.vercel.app');
    });
  
    it('should login as an employee project manager', async () => {
      await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
      await LandingPage.btnLogin.click();
      await LoginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
      await LoginPage.login('test3@employee.com', 'abcd1234');
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/home');
    });

    it('should go to projects', async () => {
      await HomePage.btnProjects.waitForDisplayed({ timeout: 2000 });
      await HomePage.btnProjects.click();
      await HomePage.btnTimesheets.waitForDisplayed({ timeout: 2000 });
      await HomePage.btnTimesheets.click();
      await HomePage.btnProjects.waitForDisplayed({ timeout: 2000 });
      await HomePage.btnProjects.click();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/projects');
    });
    
    it('should go to manage projects and see employees', async () => {
      await projectsPage.btnManage.waitForDisplayed({ timeout: 2000 });
      await projectsPage.btnManage.click();
      await browser.refresh();
      await projectsPage.btnEmployees.waitForDisplayed({ timeout: 2000 });
      await projectsPage.btnEmployees.click();
      await projectsPage.employeesInformation.waitForDisplayed({ timeout: 2000 });
    });

    it('should log out', async () => {
      await LoginPage.logout();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/');
    });
  });