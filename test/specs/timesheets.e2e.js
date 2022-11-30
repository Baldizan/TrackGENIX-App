const MainPage = require ('../pageobjects/main.page.js');
const TimesheetsPage = require ('../pageobjects/timesheets.page.js');

describe('Trackgenix application', () => {
    beforeAll('Navigate to home', () => {
        browser.url("https://marta-a-trackgenix-app.vercel.app/home");
        browser.pause(4000);
    })
    it('should redirect to timesheets page', async () => {
        MainPage.goToTimesheets();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/Time-sheets');
    });
    it('should add an employee', async () => {
        TimesheetsPage.addTimesheet();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/time-sheets/form');
    });
});