import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { User } from '../domain/interfaces';
import { AppState } from '../states';

@Injectable()
export class AuthStoreService {

	constructor(private store: Store<AppState.State>) {}

	public get currentUser(): Observable<User> {
		return this.getProperty<User>('currentUser');
	}

	public get isLoggedIn(): Observable<boolean> {
		return this.getProperty<boolean>('isLoggedIn');
	}

	public get message(): Observable<string> {
		return this.getProperty<string>('message');
	}

	public login(username: string, password: string): void {
		this.store.dispatch(new AuthActions.SignInAction({ username, password }));
	}

	public register(user: User): void {
		this.store.dispatch(new AuthActions.SignUpAction({ user }));
	}

	public logout(): void {
		this.store.dispatch(new AuthActions.LogoutAction({}));
	}

	public clearMessage(): void {
		this.store.dispatch(new AuthActions.DeleteMessageAction({}));
	}

	public getCurrentUserProfile(): void {
		this.store.dispatch(new AuthActions.GetUserProfileAction({}));
	}

	private getProperty<T extends any>(propertyName: string): Observable<T> {
		return this.store.pipe(
			select('app'),
            map((state: any) => <T>state.auth[propertyName]),
            distinctUntilChanged()
		);
	}
}
