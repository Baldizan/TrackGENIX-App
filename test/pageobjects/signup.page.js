class SignupPage {
  get inputFirstName() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[1]/input');
  }

  get inputLastName() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[2]/input');
  }

  get inputPhone() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[3]/input');
  }

  get inputEmail() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[1]/input');
  }

  get inputPassword() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[2]/input');
  }
  
  get inputRepeatPassword() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[3]/input');
  }

  get submitSignup() {
    return $('/html/body/div/div/section/form/div[3]/button[2]');
  }
  async signup(newUser) {
    await this.submitSignup.waitForDisplayed({ timeout: 2000 });
    await this.inputFirstName.waitForDisplayed({ timeout: 2000 });
    await this.inputFirstName.setValue(newUser.firstName);
    await this.inputLastName.setValue(newUser.lastName);
    await this.inputPhone.setValue(newUser.phone);
    await this.inputEmail.setValue(newUser.email);
    await this.inputPassword.setValue(newUser.password);
    await this.inputRepeatPassword.setValue(newUser.repeatPassword);
    await this.inputPassword.click();
    await this.inputRepeatPassword.click();
    await this.submitSignup.click();
  }
  get btnClose() {
    return $('/html/body/div/div/section/dialog/div/button');
  }
  
}
module.exports = new SignupPage();
