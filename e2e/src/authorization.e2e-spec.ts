import { AuthorizationPage } from './pages/authorization.po';
import {browser, by, element} from 'protractor';
import {Auth} from './auth/auth';
import { USER_MOCK, ANOTHER_USER_MOCK } from './mock';


describe('workspace-project App', () => {
  let page: AuthorizationPage;
  let auth;
  afterAll(() => {
    auth = new Auth();
    auth.logOut();
  });
  beforeEach(() => {
    page = new AuthorizationPage();
    page.navigateTo();
  });
  it('should go to registration page', () => {
    page.navigateTo();
    page.SignUpButton.click();
    browser.getCurrentUrl().then((url: string) => {
      expect(url).toEqual(`${browser.baseUrl}/registration`);
    });
  });
  it('should be valid title', () => {
    page.navigateTo();
    page.getPageTitle().then((title: string) => {
      expect(title).toEqual('Board');
    });
  });
  it('should be valid sign up button content', () => {
    page.SignUpButton.getText().then((content: string) => {
      expect(content).toBe('Sign Up');
    });
  });

  it('should be valid log in button content', () => {
    page.logInButton.getText().then((content: string) => {
      expect(content).toBe('Log In');
    });
  });

  it('should be authorization route', () => {
    page.navigateTo();
    browser.getCurrentUrl().then((url: string) => {
      expect(url).toEqual(`${browser.baseUrl}/authorization`);
    });
  });
  it('should be 2 mat-form-fields ', () => {
    expect(page.getMatFormFields().count()).toBe(2);
  });

  it('authorization: email is required ', () => {
    page.getEmailInput.sendKeys('');
    page.getPasswordInput.sendKeys('1');
    page.logInButton.click();
    element.all(by.css('mat-form-field')).get(0).element(by.css('mat-error')).getText().then((text: string) => {
      expect(text).toEqual( 'Email is required');
    });
  });
  it('authorization: email is wrong ', () => {
    page.getEmailInput.sendKeys('sdf');
    page.getPasswordInput.sendKeys('1');
    page.logInButton.click();
    element.all(by.css('mat-form-field')).get(0).element(by.css('mat-error')).getText().then((text: string) => {
      expect(text).toEqual( 'Wrong email');
    });
  });
  it('AUTHORIZATION: password is required ', () => {
    page.getEmailInput.sendKeys('sd@qw');
    page.getPasswordInput.sendKeys('');
    page.logInButton.click();
    element.all(by.css('.form--item')).get(2).element(by.css('mat-error')).getText().then((text: string) => {
      expect(text).toEqual( 'Password is required');
    });
  });

  it('AUTHORIZATION: wrong email or password', () => {
    page.getEmailInput.sendKeys('1@1');
    page.getPasswordInput.sendKeys('00');
    page.logInButton.click();
    page.authorizationError.getText().then((text: string) => {
      expect(text).toEqual('Wrong username or password');
    });
  });
  it('AUTHORIZATION: success authorization', () => {
    page.getEmailInput.sendKeys(USER_MOCK.username);
    page.getPasswordInput.sendKeys(USER_MOCK.password);
    page.logInButton.click();
    browser.getCurrentUrl().then((url: string) => {
      expect(url).toEqual(`${browser.baseUrl}/boards`);
    });

  });

});
