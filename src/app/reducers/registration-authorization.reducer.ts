/* import { User } from '../domain/User';
import * as RegistrationAuthorization from '../actions/registration-autorization.actions';

export const initialState = {
  currentUser: null,
  is: false,
  message: null
};

export interface RegistrationAuthorizationState {
  currentUser: User;
  is: boolean;
  message: string;
}

export const reducer = (
  state: RegistrationAuthorizationState = initialState,
  action: RegistrationAuthorization.Actions): RegistrationAuthorizationState => {
  switch (action.type) {
    case RegistrationAuthorization.ADD_NEW_USER_SUCCESSS: {

      return {
        currentUser: state.currentUser,
        is: true,
        message: null
      };
    }
    case RegistrationAuthorization.USER_AUTHORIZATION_SUCCESS: {
      return {
        currentUser: state.currentUser,
        is: true,
        message: null
      };
    }
    case RegistrationAuthorization.GET_PROFILE_SUCCESS: {
      sessionStorage.setItem('_id', action.payload.user.id);
      return {
          currentUser: action.payload.user,
          is: true,
          message: null
        };
    }
    case RegistrationAuthorization.LOG_OUT_SUCCESS: {
      sessionStorage.clear();
      return {
        currentUser: null,
        is: false,
        message: null
      };
    }

    case RegistrationAuthorization.USER_AUTHORIZATION_FAIL: {
      return {
        currentUser: null,
        is: false,
        message: action.payload.message
      };
    }
    case RegistrationAuthorization.ADD_NEW_USER_FAIL: {
      return {
        currentUser: null,
        is: false,
        message: action.payload.message
      };
    }

    case RegistrationAuthorization.CLEAR_MESSAGE: {
      return {
        currentUser: state.currentUser,
        is: state.is,
        message: null
      };
    }

    default: {
      return state;
    }
  }
};
 */