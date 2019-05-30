import { browser, by, element } from 'protractor';

export class AuthorizationPage {
  public getEmailInput = this.getInputByFormControl('email');
  public getPasswordInput = this.getInputByFormControl('password');
  public SignUpButton = element.all(by.css('.form--item')).last().all(by.css('button')).last();
  public logInButton = element.all(by.css('.form--item')).last().all(by.css('button')).first();
  public authorizationError = element.all(by.css('.form--item')).get(2).all(by.css('mat-error')).last();



  navigateTo() {
    return browser.get('/authorization');
  }
  navigateToTimegrid() {
    return browser.get('/boards');

  }
  getPageTitle() {
    return browser.getTitle();
  }
  private getInputByFormControl(name: string) {
    return element(by.css(`input[formControlName=${name}]`));
  }
  getMatFormFields() {
    return element.all(by.css('mat-form-field'));
  }

}
