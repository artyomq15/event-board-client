import { AppPage } from './app.po';
import { browser } from 'protractor';
import { Auth } from './auth/auth';
import { USER_MOCK } from './mock';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('should be valid title', () => {
    page.getPageTitle().then((title: string) => {
      expect(title).toEqual('Board');
    });
  });

  it('home button should have valid content', () => {
    page.homeButton.getText().then((text: string) => {
      expect(text).toBe('home');
    });
  });

  describe('Unauthorized', () => {

    it('should be authorization route', () => {
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/authorization`);
      });
    });

    it('sign up button should have valid content', () => {
      page.signUpButton.getText().then((text: string) => {
        expect(text).toBe('Sign up');
      });
    });

    it('log in button should have valid content', () => {
      page.logInButton.getText().then((text: string) => {
        expect(text).toBe('Log in');
      });
    });

    it('should go to authorization page after log in button click', () => {
      page.logInButton.click();
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/authorization`);
      });
    });

    it('should go to registration page after sign up button click', () => {
      page.signUpButton.click();
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/registration`);
      });
    });

    it('should go to authorization page after home button click', () => {
      page.signUpButton.click();
      page.homeButton.click();
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/authorization`);
      });
    });
  });

  describe('Authorized', () => {
    const auth = new Auth();

    beforeAll(() => {
      auth.logIn();
    });

    afterAll(() => {
      auth.logOut();
    });

    it('should display valid name', () => {
      page.profileButton.getText().then((text: string) => {
        expect(text).toBe(`${USER_MOCK.firstName} ${USER_MOCK.secondName}` + ' person');
      });
    });

    it('log out button should have valid name', () => {
      page.getLogOutButton().getText().then((text: string) => {
        expect(text).toBe('Log Out');
      });
    });

    it('should be timeGrid route when go to authorization route', () => {
      browser.get('/authorization');
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/boards`);
      });
    });

    it('should be timeGrid route when go to registration route', () => {
      browser.get('/registration');
      browser.getCurrentUrl().then((url: string) => {
        expect(url).toEqual(`${browser.baseUrl}/boards`);
      });
    });
  });
});
