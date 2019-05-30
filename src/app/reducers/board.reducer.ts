/* import * as BoardActions from '../actions/board.actions';

import { Board } from '../domain/Board';
import {User} from '../domain/User';
import * as UserDeserializer from '../utils/userDeserializer';

export const initialState = {
    boards: [],
    boardInvites: [],
    moderators: [],
    invited: [],
    participants: [],
    eventInvites: []
};

export interface BoardState {
    boards: Board[];
    boardInvites: Board[];
    moderators: User[];
    invited: User[];
    participants: User[];
    eventInvites: Event[];
}

export const reducer = (state: BoardState = initialState, action: BoardActions.Actions): BoardState => {

    switch (action.type) {
        case BoardActions.LOAD_BOARDS_SUCCESS: {
          action.payload.boards.forEach(element => {
            element.invited = UserDeserializer.deserializeUsers( element.invited );
            element.moderators = UserDeserializer.deserializeUsers( element.moderators );
            element.participants = UserDeserializer.deserializeUsers( element.participants );
          });

          return {
              ...state,
              boards: action.payload.boards
            };
        }

        case BoardActions.LOAD_BOARD_INVITES_SUCCESS:
        case BoardActions.LOAD_BOARD_INVITES_FAIL: {
          return {
              ...state,
              boardInvites: action.payload.boards
            };
        }

      case BoardActions.ADD_BOARD_USER: {
        let users;
        if ( action.payload.user === null) {
          users = [];
        } else {
          users = state.invited.filter((user: User) => user.id !== action.payload.user.id);
          users.push(action.payload.user);
        }
        return {
          ...state,
          invited: users,
        };
      }
      case BoardActions.REMOVE_BOARD_USER: {
        state.participants =  UserDeserializer.deserializeUsers( state.participants );
        return {
          ...state,
          invited: state.invited.filter((user: User) => user.id !== action.payload.id),
          moderators: state.moderators.filter((user: User) => user.id !== action.payload.id),
        };
      }
      case BoardActions.ADD_BOARD_MODERATOR: {
        let users;
        if ( action.payload.user === null) {
          users = [];
        } else {
          users = state.moderators.filter((user: User) => user.id !== action.payload.user.id);
          users.push(action.payload.user);
        }
        return {
          ...state,
          moderators: users,

      };
      }
      case BoardActions.REMOVE_BOARD_MODERATOR: {
        return {
          ...state,
          moderators: state.moderators.filter((user: User) => user.id !== action.payload.id),
        };
      }
      case BoardActions.ADD_BOARD_PARTICIPANTS: {
        if ( action.payload.users === null) {
          action.payload.users = [];
        }
        return {
        ...state,
        participants: action.payload.users,
      };
    }
      case BoardActions.ADD_BOARD_INVITED: {
        if ( action.payload.users === null) {
          action.payload.users = [];
        }
        return {
          ...state,
          invited: action.payload.users,
        };
      }
      case BoardActions.ADD_BOARD_MODERATORS: {
        if ( action.payload.users === null) {
          action.payload.users = [];
        }
        return {
          ...state,
          moderators: action.payload.users,
        };
      }
      case BoardActions.ACCEPT_BOARD_SUCCESS: {
      return {
        ...state,
        boardInvites: state.boardInvites.filter((board: Board) => board.id !== action.payload.board.id),
        boards: [...state.boards, action.payload.board]
      };
    }
      case BoardActions.DECLINE_BOARD_SUCCESS: {
        return {
          ...state,
          boardInvites: state.boardInvites.filter((board: Board) => board.id !== action.payload.board.id)
        };
      }

      case BoardActions.LOAD_EVENT_INVITES_SUCCESS:
      case BoardActions.LOAD_EVENT_INVITES_FAIL: {
        return {
          ...state,
          eventInvites: action.payload.events
        };
      }

      default : {
          return state;
      }
    }
};
 */