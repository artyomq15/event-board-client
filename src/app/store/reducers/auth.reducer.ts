import { AuthState } from '../states';
import { AuthActions } from '../actions';

export const reducer: (state: AuthState.State, action: AuthActions.Actions) => AuthState.State =
	(state: AuthState.State = AuthState.initialState, action: AuthActions.Actions): AuthState.State => {

	switch (action.type) {

		case AuthActions.ActionTypes.SIGN_UP_SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				message: null
			};
		}

		case AuthActions.ActionTypes.SIGN_UP_FAILURE: {
			return {
				...state,
				isLoggedIn: false,
				message: action.payload.message
			};
		}

		case AuthActions.ActionTypes.SIGN_IN_SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				message: null
			};
		}

		case AuthActions.ActionTypes.SIGN_IN_FAILURE: {
			return {
				...state,
				isLoggedIn: false,
				message: action.payload.message
			};
		}

		case AuthActions.ActionTypes.LOGOUT: {
			return {
				currentUser: null,
				isLoggedIn: false,
				message: null
			};
		}

		case AuthActions.ActionTypes.DELETE_MESSAGE: {
			return {
				...state,
				message: null
			};
		}

		case AuthActions.ActionTypes.GET_USER_PROFILE_SUCCESS: {
			return {
				...state,
				currentUser: action.payload.user,
				isLoggedIn: true
			};
        }
        
        case AuthActions.ActionTypes.GET_USER_PROFILE_FAILURE: {
			return {
				...state,
				currentUser: null,
				isLoggedIn: false
			};
		}

		default: {
			return state;
		}
	}
};
