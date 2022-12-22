class HomePage {
  get btnLogout() {
    return $('/html/body/div/div/header/div[1]/button');
  }

  get twitterBtn() {
    return $('/html/body/div/div/footer/div[2]/div[2]/a[2]');
  }

  get facebookBtn() {
    return $('/html/body/div/div/footer/div[2]/div[2]/a[1]');
  }

  get instagramBtn() {
    return $('/html/body/div/div/footer/div[2]/div[2]/a[3]');
  }
}

module.exports = new HomePage();
