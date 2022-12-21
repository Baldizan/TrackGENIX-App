class LandingPage {
  get btnLogin() {
    return $('/html/body/div/div/header/div/div/button[1]');
  }
}
module.exports = new LandingPage();
