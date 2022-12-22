class AdminsPage {
  
  get editAdmin() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[2]/td[5]/span/button');
  }

  get activateAdmin() {
    return $('/html/body/div/div/section/form/div[2]/fieldset/label[4]/select');
  }

  get btnSubmit() {
    return $('/html/body/div/div/section/form/div[3]/button[2]');
  }
  
  get btnClose() {
    return $('/html/body/div/div/section/dialog/div/button');
  }

}
module.exports = new AdminsPage();