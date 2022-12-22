class LoginPage {
  get inputEmail() {
    return $('/html/body/div/div/section/div/form/div[1]/fieldset/label[1]/input');
  }

  get inputPassword() {
    return $('/html/body/div/div/section/div/form/div[1]/fieldset/label[2]/input');
  }

  get btnLogin() {
    return $('/html/body/div/div/section/div/form/div[2]/button[2]');
  }

  get errorMsgEmail() {
    return $('/html/body/div/div/section/div/form/div[1]/fieldset/label[1]/p');
  }

  get errorMsgPassword() {
    return $('/html/body/div/div/section/div/form/div[1]/fieldset/label[2]/p');
  }

  get errorMsgGeneral() {
    return $('/html/body/div/div/section/div/form/div[1]/fieldset/p');
  }

  get btnLogout() {
    return $('/html/body/div/div/header/div[1]/button');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.inputEmail.click();
    await this.btnLogin.click();
  }

  async logout() {
    await this.btnLogout.waitForDisplayed({ timeout: 2000 });
    await this.btnLogout.click();
  }
  
}

module.exports = new LoginPage();
