class EmployeesPage {
    get btnAdd () {
        return $('//*[@id="root"]/div/section/div/header/button')
    }
    async addEmployee () {
        this.btnAdd.click();
    }
}
module.exports = new EmployeesPage();