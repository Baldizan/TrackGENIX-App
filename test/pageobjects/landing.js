class LandingPage {
  get btnLogin() {
    return $('/html/body/div/div/header/div/div/button[1]');
  }
}
export default new LandingPage();
