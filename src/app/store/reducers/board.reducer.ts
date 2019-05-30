import { User, Event, Board, EventStatus, BoardsStatus } from '../domain/interfaces';
import { BoardActions } from '../actions';

import { BoardState } from '../states';

export const reducer: (state: BoardState.State, action: BoardActions.Actions) => BoardState.State =
	(state: BoardState.State = BoardState.initialState, action: BoardActions.Actions): BoardState.State => {

	switch (action.type) {

		case BoardActions.ActionTypes.GET_BOARDS_SUCCESS: {
			return {
				...state,
				boards: action.payload.boards,
				boardsStatus: BoardsStatus.REFRESHED
			};
		}

		case BoardActions.ActionTypes.GET_BOARDS_FAILURE: {
			return {
				...state,
				boards: [],
				boardsStatus: BoardsStatus.REFRESHED
			};
		}

		case BoardActions.ActionTypes.GET_BOARD_INVITES_SUCCESS:
		case BoardActions.ActionTypes.GET_BOARD_INVITES_FAILURE: {
			return {
				...state,
				invites: {
					...state.invites,
					boards: action.payload.boards,
					status: BoardsStatus.REFRESHED
				}
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_SUCCESS:
		case BoardActions.ActionTypes.ADD_BOARD_FAILURE: {
			return {
				...state,
				boardsStatus: BoardsStatus.OBSOLETE
			};
		}

		case BoardActions.ActionTypes.EDIT_BOARD_SUCCESS:
		case BoardActions.ActionTypes.EDIT_BOARD_FAILURE: {
			console.log('EDIT BOARD SUCCESS');
			return {
				...state,
				boardsStatus: BoardsStatus.OBSOLETE
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_INVITED_USER: {
			const invited: User[] = state.boardModification.invited.filter((user: User) => user.id !== action.payload.user.id);
			invited.push(action.payload.user);

			return {
				...state,
				boardModification: {
					...state.boardModification,
					invited
				}
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_INVITED_USERS: {
			return {
				...state,
				boardModification: {
					...state.boardModification,
					invited: action.payload.users
				}
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_PARTICIPANTS: {
			return {
				...state,
				boardModification: {
					...state.boardModification,
					participants: action.payload.users
				}
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_MODERATOR: {
			const moderators: User[] = state.boardModification.moderators.filter((user: User) => user.id !== action.payload.user.id);
			moderators.push(action.payload.user);

			return {
				...state,
				boardModification: {
					...state.boardModification,
					moderators
				}
			};
		}

		case BoardActions.ActionTypes.ADD_BOARD_MODERATORS: {
			return {
				...state,
				boardModification: {
					...state.boardModification,
					moderators: action.payload.users
				}
			};
		}

		case BoardActions.ActionTypes.DELETE_BOARD_MODERATOR: {
			const moderators: User[] = state.boardModification.moderators.filter((user: User) => user.id !== action.payload.userId);

			return {
				...state,
				boardModification: {
					...state.boardModification,
					moderators
				}
			};
		}

		case BoardActions.ActionTypes.DELETE_BOARD_USER: {
			const id: string = action.payload.userId;

			const invited: User[] = state.boardModification.invited.filter((user: User) => user.id !== id);
			const participants: User[] = state.boardModification.participants.filter((user: User) => user.id !== id);
			const moderators: User[] = state.boardModification.moderators.filter((user: User) => user.id !== id);

			return {
				...state,
				boardModification: {
					...state.boardModification,
					moderators,
					participants,
					invited
				}
			};
		}

		case BoardActions.ActionTypes.ACCEPT_BOARD_SUCCESS: {
			return {
				...state,
				invites: {
					...state.invites,
					boards: state.invites.boards.filter((board: Board) => board.id !== action.payload.board.id),
					status: BoardsStatus.REFRESHED
				},
				boards: [...state.boards, action.payload.board]
			};
		}
		case BoardActions.ActionTypes.DECLINE_BOARD_SUCCESS: {
			return {
				...state,
				invites: {
					...state.invites,
					boards: state.invites.boards.filter((board: Board) => board.id !== action.payload.board.id),
					status: BoardsStatus.REFRESHED
				},
			};
		}

		case BoardActions.ActionTypes.LOAD_EVENT_INVITES_SUCCESS:
		case BoardActions.ActionTypes.LOAD_EVENT_INVITES_FAILURE: {
			return {
				...state,
				invites: {
					...state.invites,
					events: action.payload.events,
					status: BoardsStatus.REFRESHED
				}
			};
		}

		case BoardActions.ActionTypes.LOAD_EVENTS_SUCCESS: {
			const events: Event[] = action.payload.events;

			return {
				...state,
				events: events,
				currentDatePeriod: action.payload.date,
				status: EventStatus.NOT_PROCESSED,
			};
		}

		case BoardActions.ActionTypes.LOAD_EVENTS_FAILURE: {
			return {
				...state,
				events: [],
				currentDatePeriod: action.payload.date,
				status: EventStatus.RENDERED
			};
		}

		case BoardActions.ActionTypes.DELETE_EVENT_SUCCESS: {
			return {
				...state,
				currentEvent: null,
				status: EventStatus.NOT_LOADED
			};
		}

		case BoardActions.ActionTypes.SET_CURRENT_EVENT: {
			return {
				...state,
				currentEvent: action.payload.event
			};
		}

		case BoardActions.ActionTypes.REMOVE_CURRENT_EVENT: {
			return {
				...state,
				currentEvent: null
			};
		}

		case BoardActions.ActionTypes.SET_DATE: {
			return {
				...state,
				currentDatePeriod: action.payload.date,
				status: EventStatus.NOT_LOADED
			};
		}

		case BoardActions.ActionTypes.EDIT_EVENT_SUCCESS: {
			return {
				...state,
				currentEvent: state.currentEvent ? action.payload.event : state.currentEvent,
				status: EventStatus.NOT_LOADED
			};
		}

		case BoardActions.ActionTypes.LEAVE_CURRENT_EVENT_SUCCESS: {
			return {
				...state,
				currentEvent: null,
				status: EventStatus.NOT_LOADED
			};
		}

		case BoardActions.ActionTypes.ACCEPT_EVENT_SUCCESS: {
			return {
				...state,
				invites: {
					...state.invites,
					events: state.invites.events.filter((event: Event) => event.id !== action.payload.event.id),
					status: BoardsStatus.REFRESHED
				},
				events: [...state.events, action.payload.event]
			};
		}

		case BoardActions.ActionTypes.DECLINE_EVENT_SUCCESS: {
			return {
				...state,
				invites: {
					...state.invites,
					events: state.invites.events.filter((event: Event) => event.id !== action.payload.event.id),
					status: BoardsStatus.REFRESHED
				},
			};
		}

		case BoardActions.ActionTypes.GET_BOARD_SUCCESS: {
			return {
				...state,
				status: EventStatus.NOT_DEFINED,
				currentBoard: action.payload.board,
				boardsStatus: BoardsStatus.REFRESHED
			};
		}

		case BoardActions.ActionTypes.GET_BOARD_FAILURE: {
			return {
				...state,
				status: EventStatus.RENDERED,
				currentBoard: null,
				boardsStatus: BoardsStatus.REFRESHED
			};
		}

		case BoardActions.ActionTypes.GET_MY_BOARD: {
			return {
				...state,
				status: EventStatus.NOT_DEFINED
			};
		}

		/*case BoardActions.EDIT_BOARD_SUCCESS: {
			return {
				...state,
				status: EventStatus.NOT_LOADED,
				// board status ?
				// currentBoard: action.payload.board,
			};
		}*/

		case BoardActions.ActionTypes.REMOVE_CURRENT_BOARD: {
			return {
				...state,
				status: EventStatus.RENDERED,
				currentBoard: null,
			};
		}

		case BoardActions.ActionTypes.LEAVE_CURRENT_BOARD_SUCCESS: {
			return {
				...state,
				currentBoard: null
			};
		}

		case BoardActions.ActionTypes.DELETE_BOARD_SUCCESS: {
			return {
				...state,
				currentBoard: null
			};
		}

		case BoardActions.ActionTypes.PROCESS_BOARD_EVENTS_SUCCESS: {
			return {
				...state,
				status: EventStatus.NOT_RENDERED
			};
		}

		case BoardActions.ActionTypes.PROCESS_GRID_EVENTS_SUCCESS: {
			return {
				...state,
				status: EventStatus.RENDERED
			};
		}

		case BoardActions.ActionTypes.SEARCH_USER_SUCCESS: {
			return {
				...state,
				search: {
					...state.search,
					foundUsers: action.payload.users,
				}
			};
		}

		case BoardActions.ActionTypes.SEARCH_BOARDS_SUCCESS: {
			return {
				...state,
				search: {
					...state.search,
					foundBoards: action.payload.boards,
				}
			};
		}

		case BoardActions.ActionTypes.ADD_EVENT_INVITED_USER: {
			const invited: User[] = state.eventModification.invited.filter((user: User) => user.id !== action.payload.user.id);

			if (state.eventModification.participants.every((user: User) => user.id !== action.payload.user.id)) {
				invited.push(action.payload.user);
			}

			return {
				...state,
				search: {
					...state.search,
					foundUsers: []
				},
				eventModification: {
					...state.eventModification,
					invited
				}
			};
		}

		case BoardActions.ActionTypes.ADD_EVENT_INVITED_USERS: {
			return {
				...state,
				eventModification: {
					...state.eventModification,
					invited: action.payload.users
				}
			};
		}

		case BoardActions.ActionTypes.ADD_EVENT_PARTICIPANTS: {
			return {
				...state,
				eventModification: {
					...state.eventModification,
					participants: action.payload.users
				}
			};
		}

		case BoardActions.ActionTypes.REMOVE_USER: {
			const participants: User[] = state.eventModification.participants.filter((user: User) => user.id !== action.payload.id);
			const invited: User[] = state.eventModification.invited.filter((user: User) => user.id !== action.payload.id);

			return {
				...state,
				eventModification: {
					...state.eventModification,
					participants,
					invited
				}
			};
		}

		case BoardActions.ActionTypes.CLEAR_MESSAGE: {
			return {
				...state,
				eventModification: {
					...state.eventModification,
					message: ''
				}
			};
		}

		case BoardActions.ActionTypes.ADD_EVENT_SUCCESS:
		case BoardActions.ActionTypes.ADD_EVENT_FAILURE: {
			return {
				...state,
				eventModification: {
					...state.eventModification,
					message: action.payload.message,
				},
				status: EventStatus.NOT_LOADED
			};
		}

		case BoardActions.ActionTypes.ADD_SELECTED_DATE: {
			return {
				...state,
				selectedDatePeriod: action.payload.date
			};
		}

		/* ???
        case BoardActions.FIND_USERS_COLLISIONS_SUCCESS: {
          const is = action.payload.events.length !== 0;
          const usersWithState = state.usersWithState.filter((obj: UserObject) => obj.user.id !== action.payload.user.id);
          usersWithState.push({ user: action.payload.user, is: is });
          return {
            foundUsers: state.foundUsers,
            addedUsers: state.addedUsers,
            invitedUsers: state.invitedUsers,
            usersWithState: usersWithState,
            message: state.message,
            selectedDate: state.selectedDate,
            is: [is]
          };
        }*/

		case BoardActions.ActionTypes.REMOVE_CURRENT_USER_PROFILE: {
			sessionStorage.removeItem('_id');
			return {
				...state,
				currentUser: null
			};
		}

		default: {
			return state;
		}
	}
};
