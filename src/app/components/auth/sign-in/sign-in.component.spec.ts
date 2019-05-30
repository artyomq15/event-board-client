/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from '../../reducers/reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthorizationComponent } from './user-authorization.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserRegistrationStoreService } from '../../services/user.registration.store.service';

import { RouterTestingModule } from '@angular/router/testing';
import { UserRegistrationStoreServiceStub } from '../../../testing/user.registration.store.service.stub';

import * as mock from 'src/testing/mock';
import { MaterialModule } from 'src/app/material.module';

describe('UserAuthorizationComponent', () => {
  let component: UserAuthorizationComponent;
  let fixture: ComponentFixture<UserAuthorizationComponent>;
  let userRegistrationStoreService: UserRegistrationStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', reducers),
        RouterTestingModule.withRoutes([])
      ],
      declarations: [  UserAuthorizationComponent ],
      providers: [
        FormBuilder,
        UserRegistrationStoreService
      ]

    }).overrideComponent(UserAuthorizationComponent, {
      set: {
        providers: [
          { provide: UserRegistrationStoreService, useClass: UserRegistrationStoreServiceStub }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorizationComponent);
    component = fixture.componentInstance;

    userRegistrationStoreService = fixture.debugElement.injector.get(UserRegistrationStoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Authorization: submitting invalid form', () => {
    expect(component.authorizationForm.valid).toBeFalsy();

    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('Authorizatioemail form validity', () => {
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

  it('submitting form', () => {

    const spy = spyOn(userRegistrationStoreService, 'userAuthorization').and.callThrough();

    component.form['email'].setValue(mock.user.username);
    component.form['password'].setValue(mock.user.password);

    expect(component.authorizationForm).toBeTruthy();

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(mock.user.username, mock.user.password);
    expect(component.submitted).toBeFalsy();
  });
});*/
