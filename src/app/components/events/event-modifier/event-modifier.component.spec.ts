import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModifierComponent, ModificationType } from './event-modifier.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import * as mock from 'src/testing/mock';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { MaterialModule } from 'src/app/material.module';
import { reducers } from 'src/app/store/reducer';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';

describe('EventModifierComponent', () => {
  let component: EventModifierComponent;
  let fixture: ComponentFixture<EventModifierComponent>;
  let boardStoreService: BoardStoreService;
  let authStoreService: AuthStoreService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', reducers),
  ],
      declarations: [ EventModifierComponent ],
      providers: [
        FormBuilder,
        BoardStoreService
      ]
    }).overrideComponent(EventModifierComponent, {
      set: {
        providers: [
          {provide: BoardStoreService, useClass: BoardStoreServiceStub},
          {provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub }
        ]
      }
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EventModifierComponent);
      component = fixture.componentInstance;
      boardStoreService = fixture.debugElement.injector.get(BoardStoreService);
      authStoreService = fixture.debugElement.injector.get(AuthStoreService);

      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set edit modifier', () => {
    component.modificationType = ModificationType.EDIT;
    component.ngOnInit();
    expect(component.modification).toBe('Edit');
    expect(component.currentEvent).toEqual(mock.event);
  });

  it('form invalid when empty', () => {
    expect(component.eventForm.valid).toBeFalsy();
  });

  it('name form validity', () => {
    let errors = {};
    const name = component.form['name'];

    expect(name.valid).toBeFalsy();

    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    // invalid input

    name.setValue('абвгд');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // valid input

    name.setValue('abcde');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(name.valid).toBeTruthy();
  });

  it('description form validity', () => {
    let errors = {};
    const description = component.form['description'];

    expect(description.valid).toBeFalsy();

    errors = description.errors || {};
    expect(errors['required']).toBeTruthy();

    description.setValue('abcde');
    errors = description.errors || {};
    expect(errors['required']).toBeFalsy();

    expect(description.valid).toBeTruthy();
  });


  it('color form validity', () => {
    const color = component.form['color'];

    expect(color.valid).toBeTruthy();
  });
  it('creator ia added in list of search users', () => {
    expect(component.addedUsers.length).toBe(0);
  });
  it('submitting form', () => {

    expect(component.form.valid).toBeFalsy();
    component.form['name'].setValue('');
    component.form['description'].setValue(mock.event.description);

    component.onSubmit();

    expect(component.submitted).toBeTruthy();

    component.form['name'].setValue(mock.event.name);
    component.form['description'].setValue(mock.event.description);

    let event: Event;
    component.modifiedEvent.subscribe(
      (value: Event) => event = value
    );
    component.addUsers([mock.user]);

    component.onSubmit();
  });
  it('search user input', async(() => {
    const inputValue = 'abcde';

    const input = fixture.debugElement.query(By.css('#search-participant'));
    const spy = spyOn(boardStoreService, 'searchUsers');

    input.nativeElement.value = inputValue;
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(inputValue);
    });
  }));

  it('close window output', () => {
    const spy = spyOn(component.closedWindow, 'emit');
    component.closeWindow();
    expect(spy).toHaveBeenCalled();
  });
  it('submit form', () => {
    const spy = spyOn(component.modifiedEvent, 'emit');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('addUsers: should call addUsers with users', () => {
    const spy = spyOn(boardStoreService, 'addUsers');

    component.addUsers([mock.user]);
    expect(spy).toHaveBeenCalledWith([mock.user]);
  });

  it('removeUsers: should call addUsers with []', () => {
    const spy = spyOn(boardStoreService, 'addUsers');
    component.removeUsers();
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('addUser: should call addUser with user', () => {
    const input = fixture.debugElement.query(By.css('#search-participant'));
    const spy = spyOn(boardStoreService, 'addUser');

    component.addUser(mock.user);
    expect(spy).toHaveBeenCalledWith(mock.user);
    expect(input.nativeElement.value).toBe('');
  });

  it('removeUser: should call removeUser with id', () => {
    const spy = spyOn(boardStoreService, 'removeUser');
    component.removeUser('2');
    expect(spy).toHaveBeenCalledWith('2');
  });
  it('removeUser: should call removeUser with creator id', () => {
    const spy = spyOn(boardStoreService, 'removeUser');
    component.removeUser('1');
    expect(spy).toHaveBeenCalledTimes(0);
  });
  it('removeInviteEvents: should call removeUser with creator id', () => {
    const spy = spyOn(boardStoreService, 'addUser');
    component.removeInvitedUsers();
    expect(spy).toHaveBeenCalledWith(null);
  });
});
