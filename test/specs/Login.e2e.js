const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home');
const LandingPage = require('../pageobjects/landing');
const loginPage = require('../pageobjects/login.page');

describe('My Login application', () => {
  beforeAll('Navigate to URL', () => {
    browser.url('https://marta-a-trackgenix-app.vercel.app');
  });

  it('should not login with empty credentials', async () => {
    await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
    await LandingPage.btnLogin.click();
    await loginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
    await LoginPage.login('', '');
    await LoginPage.errorMsgEmail.waitForDisplayed({ timeout: 2000 });
    await LoginPage.errorMsgPassword.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorMsgEmail).toHaveText('Email is required.');
    await expect(LoginPage.errorMsgPassword).toHaveText('Password is required.');
  });

  it('should not login with invalid email format', async () => {
    await LoginPage.login('test@ho', 'test');
    await LoginPage.errorMsgEmail.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorMsgEmail).toHaveText('Invalid email format.');
    await browser.refresh();
  });

  it('should not login with invalid credentials', async () => {
    await LoginPage.login('test@hotmail.com', 'test');
    await LoginPage.errorMsgGeneral.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorMsgGeneral).toHaveText('Check your credentials');
    await browser.refresh();
  });

  it('should login with valid credentials(admin)', async () => {
    await LoginPage.login('test1@admin.com', 'abcd1234');
    await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/admin/home');
    await HomePage.btnLogout.click();
  });
  it('should login with valid credentials(superadmin)', async () => {
    await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
    await LandingPage.btnLogin.click();
    await loginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
    await LoginPage.login('test4@superadmin.com', 'abcd1234');
    await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/superadmin/home');
    await HomePage.btnLogout.click();
  });
  it('should login with valid credentials(employee)', async () => {
    await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
    await LandingPage.btnLogin.click();
    await loginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
    await LoginPage.login('test3@employee.com', 'abcd1234');
    await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/home');
    await HomePage.btnLogout.click();
  });
});
