class TimesheetsPage {
    get btnAdd () {
        return $('//*[@id="root"]/div/section/div/header/button')
    }
    async addTimesheet () {
        this.btnAdd.click();
    }
}
module.exports = new TimesheetsPage();