const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home');
const LandingPage = require('../pageobjects/landing');
const AdminPage = require('../pageobjects/admins.page');

describe('Project Manager e2e', () => {
    beforeAll('Navigate to URL', () => {
      browser.url('https://marta-a-trackgenix-app.vercel.app');
    });
  
    it('should login as a superadmin', async () => {
      await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
      await LandingPage.btnLogin.click();
      await LoginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
      await LoginPage.login('test4@superadmin.com', 'abcd1234');
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/superadmin/home');
    });

    it('should go to admins', async () => {
        await HomePage.btnAdmins.waitForDisplayed({ timeout: 2000 });
        await HomePage.btnAdmins.click();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/superadmin/admins');
    });

    it('should edit an admin and deactivate it', async () => {
        await AdminPage.editAdmin.waitForDisplayed({ timeout: 2000 });
        await AdminPage.editAdmin.click();
        await AdminPage.activateAdmin.waitForDisplayed({ timeout: 2000 });
        await AdminPage.activateAdmin.click();
        await AdminPage.activateAdmin.click({ y: -20 });
        await AdminPage.btnSubmit.waitForDisplayed({ timeout: 2000 });
        await AdminPage.btnSubmit.click();
        await AdminPage.btnClose.waitForDisplayed({ timeout: 2000 });
        await AdminPage.btnClose.click();
    });
    
    it('should log out', async () => {
      await LoginPage.logout();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/');
    });
  });