const HomePage = require('../pageobjects/home');

describe('Admin Entity', () => {
  beforeAll('Navigate to URL', () => {
    browser.url('https://marta-a-trackgenix-app.vercel.app');
  });

  it('should have href of twitter page', async () => {
    await expect(HomePage.twitterBtn).toHaveHref('https://twitter.com/radiumrocket');
  });

  it('should have href of facebook page', async () => {
    await expect(HomePage.facebookBtn).toHaveHref('https://www.facebook.com/radiumrocket');
  });

  it('should have href of linkedin page', async () => {
    await expect(HomePage.instagramBtn).toHaveHref('https://www.instagram.com/radium.rocket/');
  });
});
