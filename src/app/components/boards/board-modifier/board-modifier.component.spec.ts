import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardModifierComponent} from './board-modifier.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import * as mock from 'src/testing/mock';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { reducers } from 'src/app/store/reducer';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';
import { UserRegistrationStoreServiceStub } from 'src/testing/user.registration.store.service.stub';
import { ModificationType } from '../../events/event-modifier/event-modifier.component';

describe('BoardModifierComponent', () => {
  let component: BoardModifierComponent;
  let fixture: ComponentFixture<BoardModifierComponent>;
  let authStoreService: AuthStoreService;
  let boardStoreService: BoardStoreService;

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
      declarations: [ BoardModifierComponent ],
      providers: [
        FormBuilder
      ]
    }).overrideComponent(BoardModifierComponent, {
      set: {
        providers: [
          { provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub },
          { provide: BoardStoreService, useClass: BoardStoreServiceStub }
        ]
      }
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(BoardModifierComponent);
      component = fixture.componentInstance;
      authStoreService = fixture.debugElement.injector.get(AuthStoreService);
      boardStoreService = fixture.debugElement.injector.get(BoardStoreService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should choose the right value for modificationType', () => {
    component.modificationType = ModificationType.ADD;
    expect(component.modification).toEqual('Add');
    expect(component.isCreator).toBeTruthy();
  });
  it('should close window', () => {
    const spy = spyOn(component.closedWindow, 'emit');
    component.closeWindow();
    expect(spy).toHaveBeenCalled();
  });
  it('should add new user', () => {
    component.currentUser = {
      id: '8',
      firstName: 'zx',
      secondName: 'as',
      username: 'd',
      password: 'd'
    };
    const spy = spyOn(boardStoreService, 'addBoardUser');
    const spySearch = spyOn(boardStoreService, 'searchUsers');

    component.addUser(mock.user);
    expect(spy).toHaveBeenCalledWith(mock.user);
    expect(spySearch).toHaveBeenCalledWith('');

    component.currentUser = mock.user;
    component.addUser(mock.user);
    expect(spySearch).toHaveBeenCalledWith('');

  });
  it('should add participants', () => {
    const spy = spyOn(boardStoreService, 'addBoardParticipants');
    component.addParticipants([mock.user]);
    expect(spy).toHaveBeenCalledWith([mock.user]);
  });
  it('should add invited', () => {
    const spy = spyOn(boardStoreService, 'addBoardInvitedUsers');
    component.addInvited([mock.user]);
    expect(spy).toHaveBeenCalledWith([mock.user]);
  });
  it('should remove user', () => {
    const spy = spyOn(boardStoreService, 'removeUser');
    component.removeUser('1');
    expect(spy).toHaveBeenCalledTimes(0);

    component.removeUser('8');
    expect(spy).toHaveBeenCalledWith('8');
  });
  it('should submit form', () => {
    const spy = spyOn(component.addedBoard, 'emit');
    expect(component.form.valid).toBeFalsy();

    component.form['name'].setValue('');
    component.form['isPrivate'].setValue(true);
    expect(component.form.valid).toBeFalsy();

    component.form['name'].setValue('board');
    component.form['isPrivate'].setValue('');
    expect(component.form.valid).toBeFalsy();

    component.form['name'].setValue('board');
    component.form['isPrivate'].setValue(true);

    component.submit();
    expect(component.submitted).toBeFalsy();
  });
});
