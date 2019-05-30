/* import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers/reducer';
import { User } from '../domain/User';
import * as EventModifierActions from '../actions/event-modifier.actions';
import { Event } from '../domain/Event';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePeriod } from '../reducers/timeGrig.reducer';
import {UserObject} from '../event-modifier/event-modifier.component';


@Injectable()
export class EventModifierStoreService {
  private foundUsers$:  BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private addedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private invitedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private message$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedDate$: BehaviorSubject<DatePeriod> = new BehaviorSubject<DatePeriod>(null);
  private is$: BehaviorSubject<UserObject[]> = new BehaviorSubject<UserObject[]>([]);



  constructor(private store: Store<AppState>) {
    store
      .pipe(select('app'))
      .subscribe(state => {
        this.foundUsers$.next(state.addEvent.foundUsers),
        this.addedUsers$.next(state.addEvent.addedUsers),
        this.invitedUsers$.next(state.addEvent.invitedUsers),
        this.message$.next(state.addEvent.message);
        this.selectedDate$.next(state.addEvent.selectedDate);
        this.is$.next(state.addEvent.usersWithState);

      });
  }
  get foundUsers(): Observable<User[]> {
    return this.foundUsers$.asObservable();
  }
  get addedUsers(): Observable<User[]> {
    return this.addedUsers$.asObservable();
  }
  get invitedUsers(): Observable<User[]> {
    return this.invitedUsers$.asObservable();
  }
  get message(): Observable<string> {
    return this.message$.asObservable();
  }
  get selectedDate(): Observable<DatePeriod> {
    return this.selectedDate$.asObservable();
  }
  get is(): Observable<UserObject[]> {
    return this.is$.asObservable();
  }
  public searchUsers(query: string) {
    this.store.dispatch(new EventModifierActions.SearchUser({query}));
  }

  public addEvent(event: Event) {
    this.store.dispatch(new EventModifierActions.AddEvent({event}));
  }

  public removeUser(id: string) {
    this.store.dispatch(new EventModifierActions.RemoveUser({id}));
  }

  public addUser(user: User) {
     this.store.dispatch(new EventModifierActions.AddUser({user}));
  }

  public addUsers(users: User[]) {
    this.store.dispatch(new EventModifierActions.AddUsers({users}));
  }

  public clearMessage() {
    this.store.dispatch(new EventModifierActions.ClearMessage({}));
  }

  public addSelectedDate(date: DatePeriod) {
    this.store.dispatch(new EventModifierActions.AddSelectedDate({date}));
  }
  public findUsersCollisions (user: User, date: DatePeriod) {
    this.store.dispatch( new EventModifierActions.FindUsersCollisions({user, date}));
  }

}
 */