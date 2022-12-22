class TimesheetsPage {
  
  get btnAddHours() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[1]/td[5]/span/button');
  }

  get formInputDate() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[1]/input');
  }
  get formInputHours() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[2]/input');
  }

  get formBtnSubmit() {
    return $('/html/body/div/div/section/form/div[3]/button[2]');
  }

  get formBtnSuccess() {
    return $('/html/body/div/div/section/dialog/div/button');
  }
}
module.exports = new TimesheetsPage();