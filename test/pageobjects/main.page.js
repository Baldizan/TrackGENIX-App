class MainPage {
    get btnEmployees () {
        return $('//*[@id="root"]/div/footer/div[1]/ul/li[3]/a')
    }
    get btnTimesheets () {
        return $('//*[@id="root"]/div/footer/div[1]/ul/li[5]/a')
    }
    async goToEmployees () {
        this.btnEmployees.click();
    }
    async goToTimesheets () {
        this.btnTimesheets.click();
    }
}

module.exports = new MainPage();