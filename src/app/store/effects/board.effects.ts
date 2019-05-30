import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map, catchError, switchMap, tap, filter } from 'rxjs/operators';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { EventDataService } from '../event/event.data.service';
import { UserDataService } from '../user/user.data.service';

import { User, Board, Event, DatePeriod } from '../domain/interfaces';

import { BoardActions } from '../actions';
import { BoardDataService } from '../board/board.data.service';
import { EditBoardSuccessAction } from '../actions/board.actions';
import { Router } from '@angular/router';

@Injectable()
export class BoardEffects {

	@Effect()
	public getBoards: Observable<BoardActions.GetBoardsSuccessAction | BoardActions.GetBoardsFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.GET_BOARDS),
			map((action: BoardActions.GetBoardsAction) => action.payload),
			switchMap(({ userId }: { userId: string }) => {
				return this.boardDataService.getAll(userId)
					.pipe(
						map((boards: Board[]) => new BoardActions.GetBoardsSuccessAction({ boards })),
						catchError(() => of(new BoardActions.GetBoardsFailureAction({ boards: [] })))
					);
			})
		);

	@Effect()
	public getBoard: Observable<BoardActions.GetBoardSuccessAction | BoardActions.GetBoardFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.GET_BOARD),
			map((action: BoardActions.GetBoardAction) => action.payload),
			switchMap(({ id }: { id: string }) => {
				return this.boardDataService.get(id)
					.pipe(
						map((board: Board) => new BoardActions.GetBoardSuccessAction({ board })),
						catchError(() => of(new BoardActions.GetBoardFailureAction({ board: null })))
					);
			})
		);

	@Effect()
	public getBoardInvites: Observable<BoardActions.GetBoardInvitesSuccessAction | BoardActions.GetBoardInvitesFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.GET_BOARD_INVITES),
			map((action: BoardActions.GetBoardInvitesAction) => action.payload),
			switchMap(({ userId }: { userId: string }) => {
				return this.boardDataService.getBoardInvites(userId)
					.pipe(
						map((boards: Board[]) => new BoardActions.GetBoardInvitesSuccessAction({ boards })),
						catchError(() => of(new BoardActions.GetBoardInvitesFailureAction({ boards: [] })))
					);
			})
		);

	@Effect()
	public addBoard: Observable<BoardActions.AddBoardSuccessAction | BoardActions.AddBoardFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ADD_BOARD),
			map((action: BoardActions.AddBoardAction) => action.payload),
			switchMap(({ board }: { board: Board }) => {
				return this.boardDataService.add(board)
					.pipe(
						map(() => new BoardActions.AddBoardSuccessAction({ message: 'Board successfully added' })),
						catchError(() => of(new BoardActions.AddBoardFailureAction({ message: 'Adding Error' })))
					);
			})
		);

	@Effect()
	public editBoard: Observable<EditBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.EDIT_BOARD),
			map((action: BoardActions.EditBoardAction) => action.payload),
			switchMap(({ board }: { board: Board }) => {
				return this.boardDataService.edit(board)
					.pipe(
						map(() => new BoardActions.EditBoardSuccessAction({ message: 'Edited' }))
					);
			})
		);

	@Effect()
	public deleteBoard: Observable<BoardActions.DeleteBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.DELETE_BOARD),
			map((action: BoardActions.DeleteBoardAction) => action.payload),
			switchMap(({ board }: { board: Board }) => {
				return this.boardDataService.delete(board)
					.pipe(
						map(() => new BoardActions.DeleteBoardSuccessAction({ board })),
					);
			}
			)
		);

	@Effect({
		dispatch: false
	})
	public redirectToBoards: Observable<never> = this.actions
		.pipe(
			ofType(
				BoardActions.ActionTypes.DELETE_BOARD_SUCCESS,
				BoardActions.ActionTypes.LEAVE_CURRENT_BOARD_SUCCESS
			),
			tap(() => this.router.navigate(['/boards']))
		);

	@Effect()
	public acceptBoard: Observable<BoardActions.AcceptBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ACCEPT_BOARD),
			map((action: BoardActions.AcceptBoardAction) => action.payload),
			switchMap(({ board }: { board: Board }) => {
				return this.boardDataService.accept(board.id)
					.pipe(
						map(() => new BoardActions.AcceptBoardSuccessAction({ board })),
					);
			}
			)
		);

	@Effect()
	public enterBoard: Observable<BoardActions.EnterBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ENTER_BOARD),
			map((action: BoardActions.EnterBoardAction) => action.payload),
			switchMap(({ id, redirect }: { id: string, redirect: boolean }) => {
				return this.boardDataService.enter(id)
					.pipe(
						map(() => new BoardActions.EnterBoardSuccessAction({ id, redirect })),
					);
			}
			)
		);

	@Effect({
		dispatch: false
	})
	public redirectToBoard: Observable<any> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ENTER_BOARD_SUCCESS),
			map((action: BoardActions.EnterBoardSuccessAction) => action.payload),
			filter(({ redirect }: any) => redirect),
			tap(({ id }: any) => this.router.navigate(['/boards', id]))
		);

	@Effect()
	public declineBoard: Observable<BoardActions.DeclineBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.DECLINE_BOARD),
			map((action: BoardActions.DeclineBoardAction) => action.payload),
			switchMap(({ board }: { board: Board }) => {
				return this.boardDataService.decline(board.id)
					.pipe(
						map(() => new BoardActions.DeclineBoardSuccessAction({ board })),
					);
			}
			)
		);

	@Effect()
	public loadEventInvites: Observable<BoardActions.LoadEventInvitesSuccessAction | BoardActions.LoadEventInvitesFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.LOAD_EVENT_INVITES),
			map((action: BoardActions.LoadEventInvitesAction) => action.payload),
			switchMap(({ userId }: { userId: string }) => {
				return this.eventDataService.getEventInvites(userId)
					.pipe(
						map((events: Event[]) => new BoardActions.LoadEventInvitesSuccessAction({ events })),
						catchError(() => of(new BoardActions.LoadEventInvitesFailureAction({ events: [] })))
					);
			}
			)
		);

	@Effect()
	public searchUser: Observable<BoardActions.SearchUserSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.SEARCH_USER),
			map((action: BoardActions.SearchUserAction) => action.payload),
			switchMap(({ query }: { query: string }) => {
				return this.userDataService.searchUser(query)
					.pipe(
						map((users: User[]) => new BoardActions.SearchUserSuccessAction({ users }))
					);
			}
			)
		);

	@Effect()
	public searchBoards: Observable<BoardActions.SearchBoardsSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.SEARCH_BOARDS),
			map((action: BoardActions.SearchBoardsAction) => action.payload),
			switchMap(({ query }: { query: string }) => {
				return this.boardDataService.search(query)
					.pipe(
						map((boards: any[]) => new BoardActions.SearchBoardsSuccessAction({ boards }))
					);
			}
			)
		);

	@Effect()
	public addEvent: Observable<BoardActions.AddEventSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ADD_EVENT),
			map((action: BoardActions.AddEventAction) => action.payload),
			switchMap(({ event }: { event: Event }) => {
				return this.eventDataService.add(event)
					.pipe(
						map(() => new BoardActions.AddEventSuccessAction({ message: 'Added successfully' }))
					);
			}
			)
		);

	@Effect()
	public findUsersCollisions: Observable<BoardActions.FindUsersCollisionsSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.FIND_USERS_COLLISIONS),
			map((action: BoardActions.FindUsersCollisionsAction) => action.payload),
			switchMap(({ user, date }: { user: User, date: DatePeriod }) => {
				return this.eventDataService.findCollisions(user, date)
					.pipe(
						map((events: Event[]) => new BoardActions.FindUsersCollisionsSuccessAction({ events, user }))
					);
			}
			)
		);

	@Effect()
	public loadEvents: Observable<BoardActions.LoadEventsSuccessAction | BoardActions.LoadEventsFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.LOAD_EVENTS),
			map((action: BoardActions.LoadEventsAction) => action.payload),
			switchMap(({ date, userId }: { date: DatePeriod, userId: string }) => {
				return this.eventDataService.getEvents(date, userId)
					.pipe(
						map((events: Event[]) => new BoardActions.LoadEventsSuccessAction({ events, date })),
						catchError(() => of(new BoardActions.LoadEventsFailureAction({ events: [], date })))
					);
			}
			)
		);

	@Effect()
	public loadEventsByBoardId: Observable<BoardActions.LoadEventsSuccessAction | BoardActions.LoadEventsFailureAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.LOAD_EVENTS_BY_BOARD_ID),
			map((action: BoardActions.LoadEventsByBoardIdAction) => action.payload),
			switchMap(({ date, boardId }: { date: DatePeriod, boardId: string }) => {
				return this.eventDataService.getEventsByBoardId(date, boardId)
					.pipe(
						map((events: Event[]) => new BoardActions.LoadEventsSuccessAction({ events, date })),
						catchError(() => of(new BoardActions.LoadEventsFailureAction({ events: [], date })))
					);
			}
			)
		);

	@Effect()
	public deleteEvent: Observable<BoardActions.DeleteEventSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.DELETE_EVENT),
			map((action: BoardActions.DeleteEventAction) => action.payload),
			switchMap((payload: { event: Event }) => {
				return this.eventDataService.deleteEvent(payload.event)
					.pipe(
						map((event: Event) => new BoardActions.DeleteEventSuccessAction({ event })
						));
			})
		);

	@Effect()
	public editEvent: Observable<BoardActions.EditEventSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.EDIT_EVENT),
			map((action: BoardActions.EditEventAction) => action.payload),
			switchMap((payload: { event: Event }) => {
				return this.eventDataService.editEvent(payload.event)
					.pipe(
						map((event: Event) => new BoardActions.EditEventSuccessAction({ event })
						));
			})
		);

	@Effect()
	public leaveEvent: Observable<BoardActions.LeaveCurrentEventSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.LEAVE_CURRENT_EVENT),
			map((action: BoardActions.LeaveCurrentEventAction) => action.payload),
			switchMap((payload: { event: Event }) => {
				return this.eventDataService.leaveEvent(payload.event)
					.pipe(
						map((event: Event) => new BoardActions.LeaveCurrentEventSuccessAction({ event })
						));
			})
		);

	@Effect()
	public acceptEvent: Observable<BoardActions.AcceptEventSucessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.ACCEPT_EVENT),
			map((action: BoardActions.AcceptEventAction) => action.payload),
			switchMap(({ event }: { event: Event }) => {
				return this.eventDataService.acceptEvent(event.id)
					.pipe(map(() => new BoardActions.AcceptEventSucessAction({ event })));
			})
		);

	@Effect()
	public declineEvent: Observable<BoardActions.DeclineEventSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.DECLINE_EVENT),
			map((action: BoardActions.DeclineEventAction) => action.payload),
			switchMap(({ event }: { event: Event }) => {
				return this.eventDataService.declineEvent(event.id)
					.pipe(map(() => new BoardActions.DeclineEventSuccessAction({ event })));
			})
		);

	@Effect()
	public leaveBoard: Observable<BoardActions.LeaveBoardSuccessAction> = this.actions
		.pipe(
			ofType(BoardActions.ActionTypes.LEAVE_CURRENT_BOARD),
			map((action: BoardActions.LeaveBoardAction) => action.payload),
			switchMap((payload: { board: Board }) => {
				return this.boardDataService.leave(payload.board)
					.pipe(
						map(() => new BoardActions.LeaveBoardSuccessAction({ board: payload.board }))
					);
			}
			)
		);

	constructor(
		private actions: Actions,
		private boardDataService: BoardDataService,
		private eventDataService: EventDataService,
		private userDataService: UserDataService,
		private router: Router
	) { }

}
