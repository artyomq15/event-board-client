import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User, Board, Event, DatePeriod, EventStatus, BoardsStatus } from '../domain/interfaces';
import { AppState } from '../states';
import { BoardActions } from '../actions';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class BoardStoreService {

	constructor(private store: Store<AppState.State>) {}

	get boards(): Observable<Board[]> {
		return this.getProperty<Board[]>('boards');
	}

	get boardInvites(): Observable<Board[]> {
		return this.getNestedProperty<Board[]>('invites', 'boards');
	}

	get eventInvites(): Observable<Event[]> {
		return this.getNestedProperty<Event[]>('invites', 'events');
	}

	get inviteStatus(): Observable<BoardsStatus> {
		return this.getNestedProperty<BoardsStatus>('invites', 'status');
	}

	get boardModificationInvitedUsers(): Observable<User[]> {
		return this.getNestedProperty<User[]>('boardModification', 'invited');
	}

	get boardModificationModerators(): Observable<User[]> {
		return this.getNestedProperty<User[]>('boardModification', 'moderators');
	}

	get boardModificationParticipants(): Observable<User[]> {
		return this.getNestedProperty<User[]>('boardModification', 'participants');
	}

	get currentBoard(): Observable<Board> {
		return this.getProperty<Board>('currentBoard');
	}

	get boardsStatus(): Observable<BoardsStatus> {
		return this.getProperty<BoardsStatus>('boardsStatus');
	}

	get events(): Observable<Event[]> {
		return this.getProperty<Event[]>('events');
	}

	get eventModificationInvitedUsers(): Observable<User[]> {
		return this.getNestedProperty<User[]>('eventModification', 'invited');
	}

	get eventModificationParticipants(): Observable<User[]> {
		return this.getNestedProperty<User[]>('eventModification', 'participants');
	}

	get eventModificationMessage(): Observable<string> {
		return this.getNestedProperty<string>('eventModification', 'message');
	}

	get currentEvent(): Observable<Event> {
		return this.getProperty<Event>('currentEvent');
	}

	get currentDatePeriod(): Observable<DatePeriod> {
		return this.getProperty<DatePeriod>('currentDatePeriod');
	}

	get selectedDatePeriod(): Observable<DatePeriod> {
		return this.getProperty<DatePeriod>('selectedDatePeriod');
	}

	get foundUsers(): Observable<User[]> {
		return this.getNestedProperty<User[]>('search', 'foundUsers');
	}

	get foundBoards(): Observable<any[]> {
		return this.getNestedProperty<User[]>('search', 'foundBoards');
	}

	get status(): Observable<EventStatus> {
		return this.getProperty<EventStatus>('status');
	}

	public loadBoards(userId: string): void {
		this.store.dispatch(new BoardActions.GetBoardsAction({ userId }));
	}

	public loadBoardInvites(userId: string): void {
		this.store.dispatch(new BoardActions.GetBoardInvitesAction({ userId }));
	}

	public addBoard(board: Board): void {
		this.store.dispatch(new BoardActions.AddBoardAction({ board }));
	}

	public addBoardInvitedUser(user: User): void {
		this.store.dispatch(new BoardActions.AddBoardInvitedUserAction({ user }));
	}

	public addBoardInvitedUsers(users: User[]): void {
		this.store.dispatch(new BoardActions.AddBoardInvitedUsersAction({ users }));
	}

	public addBoardParticipants(users: User[]): void {
		this.store.dispatch(new BoardActions.AddBoardParticipantsAction({ users }));
	}

	public addBoardModerator(user: User): void {
		this.store.dispatch(new BoardActions.AddBoardModeratorAction({ user }));
	}

	public addBoardModerators(users: User[]): void {
		this.store.dispatch(new BoardActions.AddBoardModeratorsAction({ users }));
	}

	public deleteBoardModerator(userId: string): void {
		this.store.dispatch(new BoardActions.DeleteBoardModeratorAction({ userId }));
	}

	public deleteBoardUser(userId: string): void {
		this.store.dispatch(new BoardActions.DeleteBoardUserAction({ userId }));
	}

	public editBoard(board: Board): void {
		this.store.dispatch(new BoardActions.EditBoardAction({ board }));
	}

	public accept(board: Board): void {
		this.store.dispatch(new BoardActions.AcceptBoardAction({ board }));
	}

	public enterBoard(id: string, redirect: boolean = false): void {
		this.store.dispatch(new BoardActions.EnterBoardAction({ id, redirect }));
	}

	public decline(board: Board): void {
		this.store.dispatch(new BoardActions.DeclineBoardAction({ board }));
	}

	public loadEventInvites(userId: string): void {
		this.store.dispatch(new BoardActions.LoadEventInvitesAction({ userId }));
	}

	// event store

	public loadEvents(currentDate: DatePeriod, userId: string): void {
		this.store.dispatch(new BoardActions.LoadEventsAction({ date: currentDate, userId }));
	}

	public loadEventsByBoardId(currentDate: DatePeriod, boardId: string): void {
		this.store.dispatch(new BoardActions.LoadEventsByBoardIdAction({ date: currentDate, boardId }));
	}

	public deleteEvent(event: Event): void {
		this.store.dispatch(new BoardActions.DeleteEventAction({ event }));
	}

	public editEvent(event: Event): void {
		this.store.dispatch(new BoardActions.EditEventAction({ event }));
	}

	public setCurrentEvent(event: Event): void {
		this.store.dispatch(new BoardActions.SetCurrentEventAction({ event }));
	}

	public removeCurrentEvent(): void {
		this.store.dispatch(new BoardActions.RemoveCurrentEventAction({}));
	}

	public setDate(date: DatePeriod): void {
		this.store.dispatch(new BoardActions.SetDateAction({ date }));
	}

	public leaveCurrentEvent(event: Event): void {
		this.store.dispatch(new BoardActions.LeaveCurrentEventAction({ event }));
	}

	public acceptEvent(event: Event): void {
		this.store.dispatch(new BoardActions.AcceptEventAction({ event }));
	}

	public declineEvent(event: Event): void {
		this.store.dispatch(new BoardActions.DeclineEventAction({ event }));
	}

	public loadBoard(id: string): void {
		this.store.dispatch(new BoardActions.GetBoardAction({ id }));
	}

	public loadMyBoard(): void {
		this.store.dispatch(new BoardActions.GetMyBoardAction({}));
	}

	public removeCurrentBoard(): void {
		this.store.dispatch(new BoardActions.RemoveCurrentBoardAction({}));
	}

	public leaveBoard(board: Board): void {
		this.store.dispatch(new BoardActions.LeaveBoardAction({ board }));
	}

	public deleteBoard(board: Board): void {
		this.store.dispatch(new BoardActions.DeleteBoardAction({ board }));
	}

	public finishGridEventsProcessing(): void {
		this.store.dispatch(new BoardActions.ProcessGridEventsSuccessAction({}));
	}

	public finishBoardEventsProcessing(): void {
		this.store.dispatch(new BoardActions.ProcessBoardEventsSuccessAction({}));
	}

	public searchBoards(query: string): void {
		this.store.dispatch(new BoardActions.SearchBoardsAction({ query }));
	}

	// event modifier

	public searchUsers(query: string): void {
		this.store.dispatch(new BoardActions.SearchUserAction({ query }));
	}

	public addEvent(event: Event): void {
		this.store.dispatch(new BoardActions.AddEventAction({ event }));
	}

	public removeUser(id: string): void {
		this.store.dispatch(new BoardActions.RemoveUserAction({ id }));
	}

	public addEventInvitedUser(user: User): void {
		this.store.dispatch(new BoardActions.AddEventInvitedUserAction({ user }));
	}

	public addEventInvitedUsers(users: User[]): void {
		this.store.dispatch(new BoardActions.AddEventInvitedUsersAction({ users }));
	}

	public addEventParticipants(users: User[]): void {
		this.store.dispatch(new BoardActions.AddEventParticipantsAction({ users }));
	}

	public clearMessage(): void {
		this.store.dispatch(new BoardActions.ClearMessageAction({}));
	}

	public addSelectedDate(date: DatePeriod): void {
		this.store.dispatch(new BoardActions.AddSelectedDateAction({ date }));
	}

	public findUsersCollisions(user: User, date: DatePeriod): void {
		this.store.dispatch(new BoardActions.FindUsersCollisionsAction({ user, date }));
	}

	public removeCurrentUserProfile(): void {
		this.store.dispatch(new BoardActions.RemoveCurrentUserProfileAction({}));
	}

	private getProperty<T extends any>(propertyName: string): Observable<T> {
		return this.store.pipe(
			select('app'),
			map((state: any) => <T>state.board[propertyName]),
			distinctUntilChanged()
		);
	}

	private getNestedProperty<T extends any>(outerPropertyName: string, innerPropertyName: string): Observable<T> {
		return this.getProperty(outerPropertyName).pipe(
			map((property:  any) => <T>property[innerPropertyName]),
			distinctUntilChanged()
		);
	}

}
