const MainPage = require ('../pageobjects/main.page.js');
const EmployeesPage = require ('../pageobjects/employees.page.js');

describe('Trackgenix application', () => {
    beforeAll('Navigate to home', () => {
        browser.url("https://marta-a-trackgenix-app.vercel.app/home");
    })
    it('should redirect to employees page', async () => {
        MainPage.goToEmployees();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/Employees');
    });
    it('should add an employee', async () => {
        EmployeesPage.addEmployee();
        await expect(browser).toHaveUrl('https://marta-a-trackgenix-app.vercel.app/employees/form');
    });
});