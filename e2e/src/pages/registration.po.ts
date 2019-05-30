import { browser, by, element } from 'protractor';

export class RegistrationPage {
  public signUpButton = element.all(by.css('.form--item')).last().all(by.css('button')).first();
  public logInButton = element.all(by.css('.form--item')).last().all(by.css('button')).last();
  public firstNameInput = this.getInputByFormControl('firstName');
  public secondNameInput = this.getInputByFormControl('secondName');
  public emailInput = this.getInputByFormControl('email');
  public passwordInput = this.getInputByFormControl('password');
  public passwordConfirmInput = this.getInputByFormControl('passwordConfirm');
  navigateTo() {
    return browser.get('/registration');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getMatFormFields() {
    return element.all(by.css('mat-form-field'));
  }

  getHeading() {
    return element.all(by.css('.form--item')).first().element(by.css('h2')).getText();
  }

  getPasswordConfirmationError() {
    return element.all(by.css('.form--item')).get(5).all(by.css('mat-error')).last().getText();
  }

  private getInputByFormControl(name: string) {
    return element(by.css(`input[formControlName=${name}]`));
  }
}
