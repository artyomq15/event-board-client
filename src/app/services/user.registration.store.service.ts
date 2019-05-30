/* import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/User';
import { AppState } from '../reducers/reducer';
import { select, Store } from '@ngrx/store';
import * as registrationAuthorization from '../actions/registration-autorization.actions';

@Injectable()
export class UserRegistrationStoreService {
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private is$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private message$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private store: Store<AppState>) {
    store
      .pipe(select('app'))
      .subscribe(state => {
        this.currentUser$.next(state.registrationAuthorization.currentUser);
        this.is$.next(state.registrationAuthorization.is);
        this.message$.next(state.registrationAuthorization.message);
      });
  }
  get currentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }
  get is(): Observable<boolean> {
    return this.is$.asObservable();
  }
  get message(): Observable<string> {
    return this.message$.asObservable();
  }
  public addNewUser (user: User) {
    this.store.dispatch(new registrationAuthorization.AddNewUser({user}));
  }
  public userAuthorization (login: string, password: string) {
    this.store.dispatch(new registrationAuthorization.Authorization({login, password}));
  }
  public GetProfile (user: User) {
    this.store.dispatch(new registrationAuthorization.GetProfile({user}));
  }
  public LogOut (user: User) {
    this.store.dispatch(new registrationAuthorization.LogOut({user}));
  }
  public clearMessage() {
    this.store.dispatch(new registrationAuthorization.ClearMessage({}));
  }
}
 */