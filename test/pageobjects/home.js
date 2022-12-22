class HomePage {
  get btnLogout() {
    return $('/html/body/div/div/header/div[1]/button');
  }
  
  get btnSignup() {
    return $('/html/body/div/div/header/div/div/button[2]');
  }

  get btnProjects() {
    return $('/html/body/div/div/header/nav/ul/li[2]/a');
  }

  get btnTimesheets() {
    return $('/html/body/div/div/header/nav/ul/li[3]/a');
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
