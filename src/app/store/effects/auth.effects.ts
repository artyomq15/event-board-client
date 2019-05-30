import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { UserDataService } from '../user/user.data.service';
import { User } from '../domain/interfaces';
import { AuthDataService } from '../auth/auth.data.service';

import { AuthActions } from '../actions';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { TokenResponse, GetUserProfileFailureAction } from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

	@Effect()
	public signUp: Observable<AuthActions.SignUpSuccessAction | AuthActions.SignUpFailureAction> = this.actions
		.pipe(
			ofType(AuthActions.ActionTypes.SIGN_UP),
			map((action: AuthActions.SignUpAction) => action.payload),
			switchMap(({ user }: { user: User }) => {
				return this.authDataService.register(user)
					.pipe(
						map(({ token }: TokenResponse) => new AuthActions.SignUpSuccessAction({ token })),
						catchError(() => of(new AuthActions.SignUpFailureAction({ message: 'There is user with such email' })))
					);
			})
		);

	@Effect()
	public signIn: Observable<AuthActions.SignInSuccessAction | AuthActions.SignInFailureAction> = this.actions
		.pipe(
			ofType(AuthActions.ActionTypes.SIGN_IN),
			map((action: AuthActions.SignInAction) => action.payload),
			switchMap((payload: { username: string, password: string}) => {
				return this.authDataService.login(payload.username, payload.password)
					.pipe(
						map(({ token }: TokenResponse) => new AuthActions.SignInSuccessAction({ token })),
						catchError(() => of(new AuthActions.SignInFailureAction({ message: 'Wrong username or password' })))
					);
			})
		);

	@Effect({
		dispatch: false
	})
	public setToken: any = this.actions
		.pipe(
			ofType(AuthActions.ActionTypes.SIGN_IN_SUCCESS, AuthActions.ActionTypes.SIGN_UP_SUCCESS),
			map((action: AuthActions.SignInSuccessAction) => action.payload),
			tap(({ token }: TokenResponse) => this.localStorageService.saveToken(token))
		);

	@Effect({
		dispatch: false
	})
	public logout: any = this.actions
		.pipe(
			ofType(AuthActions.ActionTypes.LOGOUT, AuthActions.ActionTypes.GET_USER_PROFILE_FAILURE),
			tap(() => this.localStorageService.removeToken()),
			tap(() => this.router.navigate(['/sign-in']))
		);

	@Effect()
	public getCurrentUserProfile: Observable<AuthActions.GetUserProfileSuccessAction | GetUserProfileFailureAction> = this.actions
		.pipe(
			ofType(AuthActions.ActionTypes.GET_USER_PROFILE),
			switchMap(() => {
				return this.userDataService.getProfile()
					.pipe(
						map((user: User) => new AuthActions.GetUserProfileSuccessAction({ user })),
						catchError(() => of(new AuthActions.GetUserProfileFailureAction({})))
					);
			}));

	constructor(
		private actions: Actions,
		private authDataService: AuthDataService,
		private userDataService: UserDataService,
		private localStorageService: LocalStorageService,
		private router: Router,
	) { }
}
