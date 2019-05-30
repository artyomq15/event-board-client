import { RegistrationPage } from './pages/registration.po';
import { browser, by } from 'protractor';

describe('Registration page', () => {
  let page: RegistrationPage;
      beforeAll(() => {
          page = new RegistrationPage();
      });

      beforeEach(() => {
          page.navigateTo();
      });

      it('should be valid title', () => {
          page.getPageTitle().then((title: string) => {
            expect(title).toEqual('Board');
          });
      });

      it('should be valid heading', () => {
        browser.sleep(1100);
          page.getHeading().then((h: string) => {
            expect(h).toEqual('Registration');
          });
      });

      it('should be valid sign up button content', () => {
          page.signUpButton.getText().then((content: string) => {
              expect(content).toBe('Sign Up');
          });
      });

      it('should be valid log in button content', () => {
          page.logInButton.getText().then((content: string) => {
              expect(content).toBe('Log In');
          });
      });

      it('should go to authorization page', () => {
          page.logInButton.click();
          browser.getCurrentUrl().then((url: string) => {
              expect(url).toEqual(`${browser.baseUrl}/authorization`);
          });
      });

      it('should be 5 mat-form-fields ', () => {
          expect(page.getMatFormFields().count()).toBe(5);
      });

      it('should be valid placeholders', () => {
          expect(page.firstNameInput.getAttribute('placeholder')).toBe('First name');
          expect(page.secondNameInput.getAttribute('placeholder')).toBe('Second name');
          expect(page.emailInput.getAttribute('placeholder')).toBe('Email');
          expect(page.passwordInput.getAttribute('placeholder')).toBe('Password');
          expect(page.passwordConfirmInput.getAttribute('placeholder')).toBe('Confirm password');
      });

      it('first name: should fail registration', () => {

          page.firstNameInput.sendKeys('');
          page.secondNameInput.sendKeys('secondname');
          page.emailInput.sendKeys('email@mail.ru');
          page.passwordInput.sendKeys('password');
          page.passwordConfirmInput.sendKeys('password');

          page.signUpButton.click();

          page.getMatFormFields().get(0).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('First name is required');
          });

          page.firstNameInput.sendKeys('first name');

          page.getMatFormFields().get(0).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Bad symbols');
          });
      });

      it('second name: should fail registration', () => {

          page.firstNameInput.sendKeys('firstname');
          page.secondNameInput.sendKeys('');
          page.emailInput.sendKeys('email@mail.ru');
          page.passwordInput.sendKeys('password');
          page.passwordConfirmInput.sendKeys('password');

          page.signUpButton.click();

          page.getMatFormFields().get(1).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Second name is required');
          });

          page.secondNameInput.sendKeys('second name');

          page.getMatFormFields().get(1).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Bad symbols');
          });
      });

      it('email: should fail registration', () => {

          page.firstNameInput.sendKeys('firstname');
          page.secondNameInput.sendKeys('secondname');
          page.emailInput.sendKeys('');
          page.passwordInput.sendKeys('password');
          page.passwordConfirmInput.sendKeys('password');

          page.signUpButton.click();

          page.getMatFormFields().get(2).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Email is required');
          });

          page.emailInput.sendKeys('email');

          page.getMatFormFields().get(2).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Wrong email');
          });
      });

      it('password: should fail registration', () => {

          page.firstNameInput.sendKeys('firstname');
          page.secondNameInput.sendKeys('secondname');
          page.emailInput.sendKeys('email@mail.ru');
          page.passwordInput.sendKeys('');
          page.passwordConfirmInput.sendKeys('password');

          page.signUpButton.click();

          page.getMatFormFields().get(3).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Password is required');
          });

          page.getPasswordConfirmationError().then((text: string) => {
              expect(text).toEqual('Passwords don\'t match');
          });
      });

      it('password confirm: should fail registration', () => {

          page.firstNameInput.sendKeys('firstname');
          page.secondNameInput.sendKeys('secondname');
          page.emailInput.sendKeys('email@mail.ru');
          page.passwordInput.sendKeys('password');
          page.passwordConfirmInput.sendKeys('');

          page.signUpButton.click();

          page.getMatFormFields().get(4).element(by.css('mat-error')).getText().then((text: string) => {
              expect(text).toEqual('Confirm password is required');
          });

          page.getPasswordConfirmationError().then((text: string) => {
              expect(text).toEqual('Passwords don\'t match');
          });
      });

      it('passwords don\'t match: should fail registration', () => {

          page.firstNameInput.sendKeys('firstname');
          page.secondNameInput.sendKeys('secondname');
          page.emailInput.sendKeys('email@mail.ru');
          page.passwordInput.sendKeys('password');
          page.passwordConfirmInput.sendKeys('another password');

          page.signUpButton.click();

          page.getPasswordConfirmationError().then((text: string) => {
              expect(text).toEqual('Passwords don\'t match');
          });
      });
});
