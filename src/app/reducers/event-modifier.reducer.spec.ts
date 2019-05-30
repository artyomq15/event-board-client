/* import { reducer, initialState, EventModifierState } from './event-modifier.reducer';
import * as EventModifierActions from '../actions/event-modifier.actions';
import * as mock from '../../testing/mock';
import { User } from '../domain/User';

describe('Event-modifier reducer', () => {

    let state: EventModifierState;

    beforeEach(() => {
        state = undefined;
    });

    describe('undefined action', () => {
        it('should return default state', () => {
            state = reducer(state, {} as EventModifierActions.Actions);
            expect(state).toEqual(initialState);
        });
    });

    describe('SearchUserSuccess action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.SearchUserSuccess({users: [mock.user]}));

            expect(state).toEqual({
                ...initialState,
                foundUsers: [mock.user],
            });
        });
    });

    describe('AddUser action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddUser({user: mock.user}));

            expect(state).toEqual({
                ...initialState,
                foundUsers: [],
                invitedUsers: [mock.user]
            });
          state = reducer(state, new EventModifierActions.AddUser({user: mock.user}));

          expect(state).toEqual({
            ...initialState,
            foundUsers: [],
            invitedUsers: [mock.user]
          });
            const anotherUser = new User('2', 'name', 'name', 'pass', 'username');
            state = reducer(state, new EventModifierActions.AddUser({user: anotherUser}));

            expect(state).toEqual({
                ...initialState,
                foundUsers: [],
                invitedUsers: [mock.user, anotherUser]
            });
        });
    });

    describe('AddUsers action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddUsers({users: [mock.user]}));

            expect(state).toEqual({
                ...initialState,
                foundUsers: [],
                addedUsers: [mock.user]

            });
        });
    });

    describe('RemoveUser action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddUser({user: mock.user}));
            state = reducer(state, new EventModifierActions.RemoveUser({id: mock.user.id}));

            expect(state).toEqual({
                ...initialState,
                foundUsers: [],
                addedUsers: [],
                invitedUsers: []
            });
        });
    });

    describe('AddEventSuccess action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddEventSuccess({message: 'message'}));

            expect(state).toEqual({
                ...initialState,
                message: 'message'
            });
        });
    });

    describe('AddEventFail action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddEventFail({message: 'message'}));

            expect(state).toEqual({
                ...initialState,
                message: 'message'
            });
        });
    });


    describe('ClearMessage action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddEventSuccess({message: 'message'}));
            state = reducer(state, new EventModifierActions.ClearMessage({}));

            expect(state).toEqual({
                ...initialState,
                message: ''
            });
        });
    });

    describe('AddSelectedDate action', () => {
        it('should return valid state', () => {
            state = reducer(state, new EventModifierActions.AddSelectedDate({date: mock.date}));

            expect(state).toEqual({
                ...initialState,
                selectedDate: mock.date
            });
        });
    });
  describe('FindUserCollisions action', () => {
    it('should return valid state', () => {
      state = reducer(state, new EventModifierActions.FindUsersCollisionsSuccess({events: [], user: mock.user}));

      expect(state).toEqual({
        ...initialState,
        usersWithState: [{user: mock.user, is: false }],
        is: [false]
      });
      state = reducer(state, new EventModifierActions.FindUsersCollisionsSuccess({events: [mock.event], user: mock.user}));

      expect(state).toEqual({
        ...initialState,
        usersWithState: [{user: mock.user, is: true }],
        is: [true]
      });
    });
  });
});
 */