/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {reducers} from '../reducers/reducer';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {UserRegistrationStoreService} from '../../../services/user.registration.store.service';
import {UserRegistrationComponent} from './user-registration.component';
import {MaterialModule} from '../material.module';
import { UserRegistrationStoreServiceStub } from '../../testing/user.registration.store.service.stub';

import * as mock from '../../testing/mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userRegistrationStoreService: UserRegistrationStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', reducers),
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ UserRegistrationComponent ],
      providers: [
        FormBuilder,
        UserRegistrationStoreService
      ]

    }).overrideComponent(UserRegistrationComponent, {
      set: {
        providers: [
          { provide: UserRegistrationStoreService, useClass: UserRegistrationStoreServiceStub }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;

    userRegistrationStoreService = fixture.debugElement.injector.get(UserRegistrationStoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting invalid form', () => {
    expect(component.form.valid).toBeFalsy();

    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('first name form validity', () => {
    let errors = {};
    const firstName = component.form['firstName'];

    expect(firstName.valid).toBeFalsy();

    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // invalid input

    firstName.setValue('first name');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // valid input

    firstName.setValue(mock.user.firstName);
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(firstName.valid).toBeTruthy();
  });

  it('second name form validity', () => {
    let errors = {};
    const secondName = component.form['secondName'];

    expect(secondName.valid).toBeFalsy();

    errors = secondName.errors || {};
    expect(errors['required']).toBeTruthy();

    // invalid input

    secondName.setValue('second name');
    errors = secondName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // valid input

    secondName.setValue(mock.user.secondName);
    errors = secondName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(secondName.valid).toBeTruthy();
  });

  it('email form validity', () => {
    let errors = {};
    const email = component.form['email'];

    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // invalid input

    email.setValue('email');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // valid input

    email.setValue(mock.user.username);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('password form validity', () => {
    let errors = {};
    const password = component.password['password'];

    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // valid input

    password.setValue(mock.user.password);
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(password.valid).toBeTruthy();
  });

  it('password form validity', () => {
    let errors = {};
    const password = component.password['password'];

    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // valid input

    password.setValue(mock.user.password);
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(password.valid).toBeTruthy();
  });

  it('password confirm form validity', () => {
    let errors = {};
    const passwordConfirm = component.password['passwordConfirm'];

    expect(passwordConfirm.valid).toBeFalsy();

    errors = passwordConfirm.errors || {};
    expect(errors['required']).toBeTruthy();

    // valid input

    passwordConfirm.setValue(mock.user.password);
    errors = passwordConfirm.errors || {};
    expect(errors['required']).toBeFalsy();

    expect(passwordConfirm.valid).toBeTruthy();
  });

  it('password match', () => {
    let errors = {};

    const password = component.password['password'];
    const passwordConfirm = component.password['passwordConfirm'];

    password.setValue('qqqwwweee');
    passwordConfirm.setValue('aaasssddd');

    errors = component.form.password.errors || {};

    expect(component.form.valid).toBeFalsy();
    expect(errors['confirm']).toBeTruthy();

  });

  it('submitting form', () => {

    const spy = spyOn(userRegistrationStoreService, 'addNewUser');

    component.form['firstName'].setValue(mock.user.firstName);
    component.form['secondName'].setValue(mock.user.secondName);
    component.form['email'].setValue(mock.user.username);
    component.password['password'].setValue(mock.user.password);
    component.password['passwordConfirm'].setValue(mock.user.password);

    expect(component.form).toBeTruthy();

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
    expect(component.submitted).toBeFalsy();
  });
});*/
