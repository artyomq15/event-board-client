import { browser, element, by } from 'protractor';

export class AppPage {
  public signUpButton = element.all(by.css('.navbar--navigation-field button')).first();
  public logInButton = element.all(by.css('.navbar--navigation-field button')).last();
  public homeButton = element(by.css('.navbar--home-icon'));
  public profileButton = element.all(by.css('.profile button')).first();
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }
  getLogOutButton() {
    this.profileButton.click();
    browser.driver.sleep(3000);
    return element(by.css('#logOutButton'));
  }
}
