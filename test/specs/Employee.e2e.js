const HomePage = require('../pageobjects/home');
const LandingPage = require('../pageobjects/landing');
const LoginPage = require('../pageobjects/login.page');
const TimesheetsPage = require('../pageobjects/timesheets.page');
const SignupPage = require ('../pageobjects/signup.page');


describe('Employee e2e', () => {
    beforeAll('Navigate to URL', () => {
      browser.url('https://marta-a-trackgenix-app.vercel.app');
    });

    it('should go to sign up form', async () => {
      await HomePage.btnSignup.click();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/register');
    });

    it('fill and send the form', async () => {
      await SignupPage.signup(
        {
            firstName: 'Mickey',
            lastName: 'Tester',
            phone: 1234567890,
            email: 'test' + Math.random() + '@employee.com',
            password: 'abcd1234',
            repeatPassword: 'abcd1234',
        }
      );
    });
    it('close the message and go home', async () => {
        await browser.executeAsync((done) => {
            console.log('this should not fail')
            setTimeout(done, 3000)
        });
      await SignupPage.btnClose.waitForDisplayed({ timeout: 2500 });
      await SignupPage.btnClose.click();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/login');
    });

    it('should login as an employee', async () => {
      await LandingPage.btnLogin.waitForDisplayed({ timeout: 2000 });
      await LandingPage.btnLogin.click();
      await LoginPage.inputEmail.waitForDisplayed({ timeout: 2000 });
      await LoginPage.login('test5@employee.com', 'abcd1234');
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/home');
    });

    it('go to timesheets', async () => {
      await HomePage.btnTimesheets.waitForDisplayed({ timeout: 2000 });
      await HomePage.btnTimesheets.click();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/time-sheets');
    });

    it('should go to edit the first timesheet', async () => {
        await TimesheetsPage.btnAddHours.waitForDisplayed({ timeout: 200000 });
        await TimesheetsPage.btnAddHours.click();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/time-sheets/form');
    });

    it('should add valid hours', async () => {
      await TimesheetsPage.formInputHours.waitForDisplayed({ timeout: 2000 });
      await TimesheetsPage.formInputHours.addValue(10);
      await TimesheetsPage.formInputDate.click();
      await TimesheetsPage.formBtnSubmit.waitForDisplayed({ timeout: 2000 });
      await TimesheetsPage.formBtnSubmit.click();
      await TimesheetsPage.formBtnSuccess.waitForDisplayed({ timeout: 2000 });
      await TimesheetsPage.formBtnSuccess.click();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employee/time-sheets');
    });

    it('should log out', async () => {
      await LoginPage.logout();
      await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/');
    });

  });