import { BehaviorSubject, Observable } from 'rxjs';

import * as mock from './mock';
import { User } from 'src/app/store/domain/interfaces';

export class UserRegistrationStoreServiceStub {
    private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(mock.user);
    private is$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private message$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    get currentUser(): Observable<User> {
      return this.currentUser$.asObservable();
    }
    get is(): Observable<boolean> {
      return this.is$.asObservable();
    }
    get message(): Observable<string> {
      return this.message$.asObservable();
    }
    public addNewUser (user: User) { }

    public userAuthorization (login: string, password: string) { }

    public GetProfile (user: User) { }

    public LogOut (user: User) { }

    public clearMessage() { }
}
