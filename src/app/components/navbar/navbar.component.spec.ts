import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {  StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';
import * as mock from 'src/testing/mock';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/store/domain/interfaces';
import { BoardStoreService } from 'src/app/store/board/board.store.service';
import { MaterialModule } from 'src/app/material.module';
import { reducers } from 'src/app/store/reducer';
import { AuthStoreService } from 'src/app/store/auth/auth.store.service';
import { BoardStoreServiceStub } from 'src/testing/board.store.service.stub';

class UserRegistrationStoreServiceStub {
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(mock.user);

  private is$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( true);

  get currentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }
  get is(): Observable<boolean> {
    return this.is$.asObservable();
  }
  public GetProfile(user: User) {}
  public LogOut(user: User) {}

}
let h3: HTMLElement;


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let boardStoreService: BoardStoreService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', reducers)
      ],
      declarations: [NavbarComponent],
      providers: [
        FormBuilder,
        BoardStoreService,
      ]
    });

    TestBed.overrideComponent(
      NavbarComponent,
      {
        set: {
          providers: [
            {provide: AuthStoreService, useClass: UserRegistrationStoreServiceStub},
            {provide: BoardStoreService, useClass: BoardStoreServiceStub}
          ]
        }
      }
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    boardStoreService = fixture.debugElement.injector.get(BoardStoreService);
    h3 = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user information on page', () => {
    expect(component.user).toEqual(mock.user);
    expect(h3.textContent).toContain(component.user.name);
  });


});



