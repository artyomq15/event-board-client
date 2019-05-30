// tslint:disable:max-file-line-count

import { Action } from '@ngrx/store';

import { User, Board, Event, DatePeriod, BoardSearch } from '../domain/interfaces';

export enum ActionTypes {

	GET_BOARDS = '[BOARD] Get boards',
	GET_BOARDS_SUCCESS = '[BOARD] Get boards success',
	GET_BOARDS_FAILURE = '[BOARD] Get boards failure',

	SEARCH_BOARDS = '[BOARD] Search boards',
	SEARCH_BOARDS_SUCCESS = '[BOARD] Search boards success',
	SEARCH_BOARDS_FAILURE = '[BOARD] Search boards failure',

	GET_BOARD = '[BOARD] Get board',
	GET_BOARD_SUCCESS = '[BOARD] Get board success',
	GET_BOARD_FAILURE = '[BOARD] Get board failure',

	GET_MY_BOARD = '[BOARD] Get my board',

	GET_BOARD_INVITES = '[BOARD] Get board invites',
	GET_BOARD_INVITES_SUCCESS = '[BOARD] Get board invites success',
	GET_BOARD_INVITES_FAILURE = '[BOARD] Get board invites failure',

	ADD_BOARD = '[BOARD] Add board',
	ADD_BOARD_SUCCESS = '[BOARD] Add board success',
	ADD_BOARD_FAILURE = '[BOARD] Add board failure',

	EDIT_BOARD = '[BOARD] Edit board',
	EDIT_BOARD_SUCCESS = '[BOARD] Edit board success',
	EDIT_BOARD_FAILURE = '[BOARD] Edit board failure',

	DELETE_BOARD = '[BOARD] Delete board',
	DELETE_BOARD_SUCCESS = '[BOARD] Delete board success',

	DELETE_BOARD_USER = '[BOARD] Delete board user',

	ADD_BOARD_MODERATOR = '[BOARD] Add board moderator',
	DELETE_BOARD_MODERATOR = '[BOARD] Delete board moderator',

	// NOT CHECKED FUNCTIONALITY

	ADD_BOARD_MODERATORS = '[BOARD] Add board moderators',

	ADD_BOARD_INVITED_USER = '[BOARD] Add board invited user',

	ADD_BOARD_INVITED_USERS = '[BOARD] Add board invited users',

	ADD_BOARD_PARTICIPANTS = '[BOARD] Add board participants',

	SET_CURRENT_BOARD = '[BOARD] Set current board',

	ACCEPT_BOARD = '[BOARD] Accept board',
	ACCEPT_BOARD_SUCCESS = '[BOARD] Accept board success',

	ENTER_BOARD = '[BOARD] Enter board',
	ENTER_BOARD_SUCCESS = '[BOARD] Enter board success',

	DECLINE_BOARD = '[BOARD] Decline board',
	DECLINE_BOARD_SUCCESS = '[BOARD] Decline board success',

	LOAD_EVENT_INVITES = '[BOARD] Load event invites',
	LOAD_EVENT_INVITES_SUCCESS = '[BOARD] Load event invites success',
	LOAD_EVENT_INVITES_FAILURE = '[BOARD] Load event invites failure',

	LOAD_EVENTS = '[BOARD] Load events',
	LOAD_EVENTS_SUCCESS = '[BOARD] Load events success',
	LOAD_EVENTS_FAILURE = '[BOARD] Load events failure',

	LOAD_EVENTS_BY_BOARD_ID = '[BOARD] Load events by board id',

	SET_CURRENT_EVENT = '[BOARD] Set current event',
	REMOVE_CURRENT_EVENT = '[BOARD] Remove current event',

	DELETE_EVENT = '[BOARD] Delete event',
	DELETE_EVENT_SUCCESS = '[BOARD] Delete event success',

	EDIT_EVENT = '[BOARD] Edit event',
	EDIT_EVENT_SUCCESS = '[BOARD] Edit event success',

	SET_DATE = '[BOARD] Set date',

	LEAVE_CURRENT_EVENT = '[BOARD] Leave current event',
	LEAVE_CURRENT_EVENT_SUCCESS = '[BOARD] Leave current event success',

	ACCEPT_EVENT = '[BOARD] Accept event',
	ACCEPT_EVENT_SUCCESS = '[BOARD] Accept event success',

	DECLINE_EVENT = '[BOARD] Decline event',
	DECLINE_EVENT_SUCCESS = '[BOARD] Decline event success',

	GO_TO_NEXT_WEEK = '[BOARD] Go to next week',
	GO_TO_PREVIOUS_WEEK = '[BOARD] Go to previous week',

	LEAVE_CURRENT_BOARD = '[BOARD] Leave board',
	LEAVE_CURRENT_BOARD_SUCCESS = '[BOARD] Leave board success',

	REMOVE_CURRENT_BOARD = '[BOARD] Remove current board',

	PROCESS_GRID_EVENTS_SUCCESS = '[BOARD] Process grid events success',
	PROCESS_BOARD_EVENTS_SUCCESS = '[BOARD] Process board events success',

	SEARCH_USER = '[BOARD] Search user',
	SEARCH_USER_SUCCESS = '[BOARD] Search user success',

	ADD_SELECTED_DATE = '[BOARD] Add selected date',

	ADD_EVENT_INVITED_USER = '[BOARD] Add event invited user',
	ADD_EVENT_INVITED_USERS = '[BOARD] Add event invited users',
	ADD_EVENT_PARTICIPANTS = '[BOARD] Add event participants',
	REMOVE_USER = '[BOARD] Remove user',

	ADD_EVENT = '[BOARD] Add event',
	ADD_EVENT_SUCCESS = '[BOARD] Add event success',

	FIND_USERS_COLLISIONS = '[BOARD] Find users collisions',
	FIND_USERS_COLLISIONS_SUCCESS = '[BOARD] Find users collisions successful',

	ADD_EVENT_FAILURE = '[BOARD] Add event failure',

	CLEAR_MESSAGE = '[BOARD] Clear message',

	REMOVE_CURRENT_USER_PROFILE = '[BOARD] Remove current user profile',

}

// GET BOARDS

export class GetBoardsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARDS;
	constructor(public payload: { userId: string }) { }
}

export class GetBoardsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARDS_SUCCESS;
	constructor(public payload: { boards: Board[] }) { }
}

export class GetBoardsFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARDS_FAILURE;
	constructor(public payload: { boards: Board[] }) { }
}

// SEARCH BOARDS

export class SearchBoardsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SEARCH_BOARDS;
	constructor(public payload: { query: string }) { }
}

export class SearchBoardsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SEARCH_BOARDS_SUCCESS;
	constructor(public payload: { boards: BoardSearch[] }) { }
}

export class SearchBoardsFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SEARCH_BOARDS_FAILURE;
	constructor(public payload: { boards: BoardSearch[] }) { }
}

// GET BOARD

export class GetBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD;
	constructor(public payload: { id: string }) { }
}

export class GetBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD_SUCCESS;
	constructor(public payload: { board: Board }) { }
}

export class GetBoardFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD_FAILURE;
	constructor(public payload: { board: Board }) { }
}

// GET MY BOARD

export class GetMyBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_MY_BOARD;
	constructor(public payload: {}) { }
}

// GET BOARD INVITES

export class GetBoardInvitesAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD_INVITES;
	constructor(public payload: { userId: string }) { }
}

export class GetBoardInvitesSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD_INVITES_SUCCESS;
	constructor(public payload: { boards: Board[] }) { }
}

export class GetBoardInvitesFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GET_BOARD_INVITES_FAILURE;
	constructor(public payload: { boards: Board[] }) { }
}

// ADD BOARD

export class AddBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD;
	constructor(public payload: { board: Board }) { }
}

export class AddBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_SUCCESS;
	constructor(public payload: { message: string }) { }
}

export class AddBoardFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_FAILURE;
	constructor(public payload: { message: string }) { }
}

// EDIT BOARD
export class EditBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.EDIT_BOARD;
	constructor(public payload: { board: Board }) { }
}

export class EditBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.EDIT_BOARD_SUCCESS;
	constructor(public payload: { message: string }) { }
}

export class EditBoardFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.EDIT_BOARD_FAILURE;
	constructor(public payload: { message: string }) { }
}

// DELETE BOARD

export class DeleteBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_BOARD;
	constructor(public payload: { board: Board }) { }
}
export class DeleteBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_BOARD_SUCCESS;
	constructor(public payload: { board: Board }) { }
}

// DELETE BOARD USER
export class DeleteBoardUserAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_BOARD_USER;
	constructor(public payload: { userId: string }) { }
}

// NOT CHECKED FUNCTIONALITY

export class AddBoardModeratorAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_MODERATOR;
	constructor(public payload: { user: User }) { }
}

export class AddBoardInvitedUserAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_INVITED_USER;
	constructor(public payload: { user: User }) { }
}

export class DeleteBoardModeratorAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_BOARD_MODERATOR;
	constructor(public payload: { userId: string }) { }
}

export class SetCurrentBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SET_CURRENT_BOARD;
	constructor(public payload: { board: Board }) { }
}

export class AddBoardParticipantsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_PARTICIPANTS;
	constructor(public payload: { users: User[] }) { }
}

export class AddBoardInvitedUsersAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_INVITED_USERS;
	constructor(public payload: { users: User[] }) { }
}

export class AddBoardModeratorsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_BOARD_MODERATORS;
	constructor(public payload: { users: User[] }) { }
}

export class AcceptBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ACCEPT_BOARD;
	constructor(public payload: { board: Board }) { }
}

export class AcceptBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ACCEPT_BOARD_SUCCESS;
	constructor(public payload: { board: Board }) { }
}

export class EnterBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ENTER_BOARD;
	constructor(public payload: { id: string, redirect?: boolean }) { }
}

export class EnterBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ENTER_BOARD_SUCCESS;
	constructor(public payload: { id: string, redirect?: boolean }) { }
}

export class DeclineBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DECLINE_BOARD;
	constructor(public payload: { board: Board }) { }
}

export class DeclineBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DECLINE_BOARD_SUCCESS;
	constructor(public payload: { board: Board }) { }
}

export class LoadEventInvitesAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENT_INVITES;
	constructor(public payload: { userId: string }) { }
}

export class LoadEventInvitesSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENT_INVITES_SUCCESS;
	constructor(public payload: { events: Event[] }) { }
}

export class LoadEventInvitesFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENT_INVITES_FAILURE;
	constructor(public payload: { events: Event[] }) { }
}

export class LoadEventsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENTS;
	constructor(public payload: {
		date: DatePeriod,
		userId: string
	}) { }
}

export class LoadEventsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENTS_SUCCESS;
	constructor(public payload: {
		events: Event[],
		date: DatePeriod
	}) { }
}

export class LoadEventsFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENTS_FAILURE;
	constructor(public payload: {
		events: Event[],
		date: DatePeriod
	}) { }
}

export class LoadEventsByBoardIdAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LOAD_EVENTS_BY_BOARD_ID;
	constructor(public payload: {
		date: DatePeriod,
		boardId: string
	}) { }
}

export class LeaveCurrentEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LEAVE_CURRENT_EVENT;
	constructor(public payload: { event: Event }) { }
}
export class AcceptEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ACCEPT_EVENT;
	constructor(public payload: { event: Event }) { }
}
export class AcceptEventSucessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ACCEPT_EVENT_SUCCESS;
	constructor(public payload: { event: Event }) { }
}
export class DeclineEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DECLINE_EVENT;
	constructor(public payload: { event: Event }) { }
}
export class DeclineEventSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DECLINE_EVENT_SUCCESS;
	constructor(public payload: { event: Event }) { }
}
export class LeaveCurrentEventSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LEAVE_CURRENT_EVENT_SUCCESS;
	constructor(public payload: { event: Event }) { }
}

export class DeleteEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_EVENT;
	constructor(public payload: { event: Event }) { }
}
export class DeleteEventSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.DELETE_EVENT_SUCCESS;
	constructor(public payload: { event: Event }) { }
}
export class EditEventSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.EDIT_EVENT_SUCCESS;
	constructor(public payload: { event: Event }) { }
}

export class EditEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.EDIT_EVENT;
	constructor(public payload: { event: Event }) { }
}

export class GoToNextWeekAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GO_TO_NEXT_WEEK;
	constructor(public payload: {}) { }
}

export class GoToPreviousWeekAction implements Action {
	public readonly type: ActionTypes = ActionTypes.GO_TO_PREVIOUS_WEEK;
	constructor(public payload: {}) { }
}

export class SetCurrentEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SET_CURRENT_EVENT;
	constructor(public payload: { event: Event }) { }
}

export class RemoveCurrentEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.REMOVE_CURRENT_EVENT;
	constructor(public payload: {}) { }
}

export class SetDateAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SET_DATE;
	constructor(public payload: { date: DatePeriod }) { }
}

export class RemoveCurrentBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.REMOVE_CURRENT_BOARD;
	constructor(public payload: {}) { }
}
export class LeaveBoardAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LEAVE_CURRENT_BOARD;
	constructor(public payload: { board: Board }) { }
}
export class LeaveBoardSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.LEAVE_CURRENT_BOARD_SUCCESS;
	constructor(public payload: { board: Board }) { }
}

export class ProcessGridEventsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.PROCESS_GRID_EVENTS_SUCCESS;
	constructor(public payload: {}) { }
}

export class ProcessBoardEventsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.PROCESS_BOARD_EVENTS_SUCCESS;
	constructor(public payload: {}) { }
}

// event modifier

export class SearchUserAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SEARCH_USER;
	constructor(public payload: { query: string }) { }
}

export class SearchUserSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.SEARCH_USER_SUCCESS;
	constructor(public payload: { users: User[] }) { }
}

export class FindUsersCollisionsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.FIND_USERS_COLLISIONS;
	constructor(public payload: { user: User, date: DatePeriod }) { }
}

export class FindUsersCollisionsSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.FIND_USERS_COLLISIONS_SUCCESS;
	constructor(public payload: {
		events: Event[],
		user: User
	}) { }
}

export class AddEventInvitedUserAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT_INVITED_USER;
	constructor(public payload: { user: User }) { }
}

export class AddEventInvitedUsersAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT_INVITED_USERS;
	constructor(public payload: { users: User[] }) { }
}

export class AddEventParticipantsAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT_PARTICIPANTS;
	constructor(public payload: { users: User[] }) { }
}

export class RemoveUserAction implements Action {
	public readonly type: ActionTypes = ActionTypes.REMOVE_USER;
	constructor(public payload: { id: string }) { }
}

export class AddEventAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT;
	constructor(public payload: { event: Event }) { }
}

export class AddEventSuccessAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT_SUCCESS;
	constructor(public payload: { message: string }) { }
}

export class AddEventFailureAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_EVENT_FAILURE;
	constructor(public payload: { message: string }) { }
}

export class ClearMessageAction implements Action {
	public readonly type: ActionTypes = ActionTypes.CLEAR_MESSAGE;
	constructor(public payload: any) { }
}

export class AddSelectedDateAction implements Action {
	public readonly type: ActionTypes = ActionTypes.ADD_SELECTED_DATE;
	constructor(public payload: { date: DatePeriod }) { }
}

export class RemoveCurrentUserProfileAction implements Action {
	public readonly type: ActionTypes = ActionTypes.REMOVE_CURRENT_USER_PROFILE;
	constructor(public payload: any) { }
}

export type Actions =
	GetBoardsAction | GetBoardsSuccessAction | GetBoardsFailureAction |
	SearchBoardsAction | SearchBoardsSuccessAction | SearchBoardsFailureAction |
	GetBoardInvitesAction | GetBoardInvitesSuccessAction | GetBoardInvitesFailureAction |
	AddBoardAction | AddBoardSuccessAction | AddBoardFailureAction |
	EditBoardAction | EditBoardSuccessAction | EditBoardFailureAction |
	GetBoardAction | GetBoardSuccessAction | GetBoardFailureAction |
	GetMyBoardAction |
	DeleteBoardAction | DeleteBoardSuccessAction |
	EnterBoardAction | EnterBoardSuccessAction |
	AddBoardModeratorAction
	| AddBoardModeratorsAction
	| AddBoardInvitedUserAction
	| AddBoardInvitedUsersAction
	| DeleteBoardUserAction
	| DeleteBoardModeratorAction
	| SetCurrentBoardAction
	| AddBoardParticipantsAction
	| AcceptBoardAction
	| AcceptBoardSuccessAction
	| DeclineBoardAction
	| DeclineBoardSuccessAction
	| LoadEventInvitesAction
	| LoadEventInvitesSuccessAction
	| LoadEventInvitesFailureAction
	| LoadEventsAction
	| LoadEventsSuccessAction
	| LoadEventsFailureAction
	| LoadEventsByBoardIdAction
	| LeaveCurrentEventAction
	| AcceptEventAction
	| AcceptEventSucessAction
	| DeclineEventAction
	| DeclineEventSuccessAction
	| LeaveCurrentEventSuccessAction
	| DeleteEventAction
	| DeleteEventSuccessAction
	| EditEventSuccessAction
	| EditEventAction
	| GoToNextWeekAction
	| GoToPreviousWeekAction
	| SetCurrentEventAction
	| RemoveCurrentEventAction
	| SetDateAction
	| RemoveCurrentBoardAction
	| LeaveBoardAction
	| LeaveBoardSuccessAction
	| ProcessGridEventsSuccessAction
	| ProcessBoardEventsSuccessAction
	| SearchUserAction
	| SearchUserSuccessAction
	| AddEventInvitedUserAction
	| AddEventInvitedUsersAction
	| AddEventParticipantsAction
	| RemoveUserAction
	| AddEventAction
	| AddEventSuccessAction
	| AddEventFailureAction
	| ClearMessageAction
	| AddSelectedDateAction
	| FindUsersCollisionsAction
	| FindUsersCollisionsSuccessAction
	| RemoveCurrentUserProfileAction;
