import { Action } from '@ngrx/store';
import { User } from '../domain/interfaces';

export interface TokenResponse {
	token: string;
}

export enum ActionTypes {

	SIGN_IN = '[AUTH] Sign in',
	SIGN_IN_SUCCESS = '[AUTH] Sign in success',
	SIGN_IN_FAILURE = '[AUTH] Sign in failure',

	SIGN_UP = '[AUTH] Sign up',
	SIGN_UP_SUCCESS = '[AUTH] Sign up success',
	SIGN_UP_FAILURE = '[AUTH] Sign up failure',

    LOGOUT = '[AUTH] Logout',
    
    GET_USER_PROFILE = '[AUTH] Get user profile',
    GET_USER_PROFILE_SUCCESS = '[AUTH] Get user profile success',
    GET_USER_PROFILE_FAILURE = '[AUTH] Get user profile failure',

    DELETE_MESSAGE = '[AUTH] Delete message'

}

export class SignUpAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_UP;
	constructor(public payload: { user: User }) {}
}

export class SignUpSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_UP_SUCCESS;
	constructor(public payload: TokenResponse) {}
}

export class SignUpFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_UP_FAILURE;
	constructor(public payload: { message: string }) {}
}

export class SignInAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_IN;
	constructor(public payload: { username: string, password: string }) {}
}

export class SignInSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_IN_SUCCESS;
	constructor(public payload: TokenResponse) {}
}

export class SignInFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SIGN_IN_FAILURE;
	constructor(public payload: { message: string }) {}
}

export class LogoutAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOGOUT;
	constructor(public payload: any) {}
}

export class DeleteMessageAction implements Action {
  public readonly type: string = ActionTypes.DELETE_MESSAGE;
  constructor(public payload: any) {}
}

export class GetUserProfileAction implements Action {
	public readonly type: string = ActionTypes.GET_USER_PROFILE;
	constructor(public payload: any) { }
}

export class GetUserProfileSuccessAction implements Action {
	public readonly type: string = ActionTypes.GET_USER_PROFILE_SUCCESS;
	constructor(public payload: { user: User }) { }
}

export class GetUserProfileFailureAction implements Action {
	public readonly type: string = ActionTypes.GET_USER_PROFILE_FAILURE;
	constructor(public payload: any) { }
}

export type Actions =
	SignInAction | SignInSuccessAction | SignInFailureAction |
	SignUpAction | SignUpSuccessAction | SignUpFailureAction |
	LogoutAction |
	DeleteMessageAction |
	GetUserProfileAction | GetUserProfileSuccessAction | GetUserProfileFailureAction;
