/* import {
  AddNewUserFail,
  AddNewUserSuccess, AuthorizationFail,
  AuthorizationSuccess, ClearMessage,
  GetProfileSuccess,
  LogOutSuccess
} from '../actions/registration-autorization.actions';
import { User } from '../domain/User';
import { initialState, reducer } from './registration-authorization.reducer';

describe('User registration & Authorization Reducer', () => {
  const user = new User ('', 'qwe', 'qwe', 'qwe' , 'qwe');
  const isSign = true;
  const isLog = true;
  const message = 'user authorization error';

  describe('[ADD_NEW_USER_SUCCESS] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new AddNewUserSuccess({isSign});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
         currentUser: null,
        is: true
      });
    });
  });
  describe('[USER_AUTHORIZATION_SUCCESS] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new AuthorizationSuccess({isLog});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: null,
        is: true
      });
    });
  });
  describe('[GET_PROFILE_SUCCESS] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new GetProfileSuccess({user});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: user,
        is: true
      });
    });
  });
  describe('[LOG_OUT_SUCCESS] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new LogOutSuccess({user});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: null,
        is: false
      });
    });
  });
  describe('[USER_AUTHORIZATION_FAIL] Authorization user', () => {
    it('should toggle loading state', () => {
      const action = new AuthorizationFail({message});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: null,
        is: false,
        message: message
      });
    });
  });
  describe('[ADD_NEW_USER_FAIL] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new AddNewUserFail({message});
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: null,
        is: false,
        message: message
      });
    });
  });
  describe('[CLEAR_MESSAGE] Add new user', () => {
    it('should toggle loading state', () => {
      const action = new ClearMessage(null);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentUser: null,
        is: false,
        message: null
      });
    });
  });
});
 */