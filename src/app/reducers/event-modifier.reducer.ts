/* import * as EventModifierActions from '../actions/event-modifier.actions';
import { User } from '../domain/User';
import { DatePeriod } from './timeGrig.reducer';
import {UserObject} from '../event-modifier/event-modifier.component';

export const initialState = {
    foundUsers: [],
    addedUsers: [],
    invitedUsers: [],
    usersWithState: [],
    message: '',
    selectedDate: null,
    is: []

};

export interface EventModifierState {
    foundUsers: User[];
    addedUsers: User[];
    invitedUsers: User[];
    usersWithState: UserObject[];
    message: string;
    selectedDate: DatePeriod;
    is: boolean[];

}

export const reducer = (state: EventModifierState = initialState, action: EventModifierActions.Actions): EventModifierState => {
    switch (action.type) {

        case EventModifierActions.SEARCH_USER_SUCCESS: {
            return {
                foundUsers: action.payload.users,
                addedUsers: state.addedUsers,
                invitedUsers: state.invitedUsers,
                usersWithState: state.usersWithState,
                message: state.message,
                selectedDate: state.selectedDate,
                is: state.is,
            };
        }

        case EventModifierActions.ADD_USER: {
          let users;
          if ( action.payload.user === null) {
            users = [];
            state.usersWithState = [];
          } else {
            users = state.invitedUsers.filter((user: User) => user.id !== action.payload.user.id);
            users.push(action.payload.user);

          }
            return {
                foundUsers: [],
                addedUsers: state.addedUsers,
                invitedUsers: users,
                usersWithState: state.usersWithState,
                message: state.message,
                selectedDate: state.selectedDate,
                is: state.is,

            };
        }

        case EventModifierActions.ADD_USERS: {
            return {
                foundUsers: [],
                addedUsers: action.payload.users,
                invitedUsers: state.invitedUsers,
                usersWithState: state.usersWithState,
                message: state.message,
                selectedDate: state.selectedDate,
                is: state.is,

            };
        }

        case EventModifierActions.REMOVE_USER: {
            return {
                foundUsers: state.foundUsers,
                addedUsers: state.addedUsers.filter((user: User) => user.id !== action.payload.id),
                invitedUsers: state.invitedUsers.filter((user: User) => user.id !== action.payload.id),
                usersWithState: state.usersWithState.filter((obj: UserObject) => obj.user.id !== action.payload.id),
                message: state.message,
                selectedDate: state.selectedDate,
                is: state.is,

            };
        }

        case EventModifierActions.CLEAR_MESSAGE: {
            return {
                foundUsers: state.foundUsers,
                addedUsers: state.addedUsers,
                invitedUsers: state.invitedUsers,
                usersWithState: state.usersWithState,
                message: '',
                selectedDate: state.selectedDate,
                is: state.is,

            };
        }

        case EventModifierActions.ADD_EVENT_SUCCESS:
        case EventModifierActions.ADD_EVENT_FAIL: {
            return {
                foundUsers: state.foundUsers,
                addedUsers: state.addedUsers,
                invitedUsers: state.invitedUsers,
                usersWithState: state.usersWithState,
                message: action.payload.message,
                selectedDate: state.selectedDate,
                is: state.is,

            };
        }

        case EventModifierActions.ADD_SELECTED_DATE: {
            return {
                foundUsers: state.foundUsers,
                addedUsers: state.addedUsers,
                invitedUsers: state.invitedUsers,
                usersWithState: state.usersWithState,
                message: state.message,
                selectedDate: action.payload.date,
                is: state.is,

            };
        }
        case EventModifierActions.FIND_USERS_COLLISIONS_SUCCESS: {
          const is = action.payload.events.length !== 0;
          const usersWithState  = state.usersWithState.filter((obj: UserObject) => obj.user.id !== action.payload.user.id);
          usersWithState.push({user: action.payload.user, is: is});
          return {
            foundUsers: state.foundUsers,
            addedUsers: state.addedUsers,
            invitedUsers: state.invitedUsers,
            usersWithState: usersWithState,
            message: state.message,
            selectedDate: state.selectedDate,
            is: [is]
      };
    }
        default : {
            return state;
        }
    }
};
 */