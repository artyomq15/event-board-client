import { AuthorizationPage } from '../pages/authorization.po';
import { AppPage } from '../app.po';
import { browser } from 'protractor';
import { USER_MOCK } from '../mock';

export class Auth {
    private authPage = new AuthorizationPage();
    private appPage = new AppPage();

    public logIn(username: string = USER_MOCK.username, password: string = USER_MOCK.password) {
        this.authPage.navigateTo();
        this.authPage.getEmailInput.sendKeys(username);
        this.authPage.getPasswordInput.sendKeys(password);
        this.authPage.logInButton.click();
        browser.driver.sleep(3000);
    }

    public logOut() {
        this.appPage.navigateTo();
        this.appPage.getLogOutButton().click();
    }
}
