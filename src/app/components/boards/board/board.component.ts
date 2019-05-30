import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, ReplaySubject, combineLatest } from 'rxjs';

import * as DateUtil from '../../utils/date.util';
import { Board, DatePeriod, Event, EventStatus, User, ModificationType, BoardsStatus } from 'src/app/store/domain/interfaces';
import { BoardStoreService, AuthStoreService } from 'src/app/store/services';
import { map, filter, withLatestFrom, publishReplay, refCount, tap, takeUntil, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: [
		'../../../shared/icon.scss',
		'../../../shared/board-panel.scss',
		'./board.component.scss'
	]
})
export class BoardComponent implements OnInit, OnDestroy {

	public currentEvents: Event[] = [];

	public currentBoard$: Observable<Board>;
	public events$: Observable<Event[]>;
	public currentEvent$: Observable<Event>;
	public currentDatePeriod$: Observable<DatePeriod>;
	public eventStatus$: Observable<EventStatus>;
	public currentUserId$: Observable<string>;

	public showEditButtons$: Observable<boolean>;

	public boardId: string;

	public boardModificatorConfigSource: ReplaySubject<any> = new ReplaySubject<any>();
	public eventModificatorConfigSource: ReplaySubject<any> = new ReplaySubject<any>();

	private loadEventsSource: ReplaySubject<DatePeriod> = new ReplaySubject<DatePeriod>(1);
	private deleteBoardSource: ReplaySubject<void> = new ReplaySubject<void>(1);
	private leaveBoardSource: ReplaySubject<void> = new ReplaySubject<void>(1);

	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	constructor(
		private boardStoreService: BoardStoreService,
		private authStoreService: AuthStoreService,
		private router: Router,
		private route: ActivatedRoute,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void {
		this.boardId = this.route.snapshot.paramMap.get('id');

		this.boardStoreService.loadBoard(this.boardId);

		this.boardStoreService.boardsStatus.pipe(
			tap(() => {
				console.log('STATUS CHANGED');
			}),
			filter((status: BoardsStatus) => status === BoardsStatus.OBSOLETE),
			tap(() => {
				console.log('OBSOLETE');
				this.boardStoreService.loadBoard(this.boardId);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.currentDatePeriod$ = this.boardStoreService.currentDatePeriod.pipe(
			filter(({from, to}: DatePeriod) => from !== null && to !== null),
			publishReplay(1),
			refCount()
		);

		this.eventStatus$ = this.boardStoreService.status.pipe(
			publishReplay(1),
			refCount()
		);

		this.currentUserId$ = this.authStoreService.currentUser.pipe(
			filter((user: User) => user !== null),
			map((user: User) => user.id),
			publishReplay(1),
			refCount()
		);

		this.currentBoard$ = this.boardStoreService.currentBoard.pipe(
			filter((board: Board) => board !== null),
			withLatestFrom(this.authStoreService.currentUser),
			map(([board, user]: [Board, User]) => ({
				...board,
				editable: board.creator.id === user.id || board.moderators.some((m: User) => m.id === user.id),
				removable: board.creator.id === user.id,
			})),
			publishReplay(1),
			refCount()
		);

		this.showEditButtons$ = this.currentBoard$.pipe(
			map((board: Board) => board.removable || board.editable),
			distinctUntilChanged()
		);

		this.currentEvent$ = this.boardStoreService.currentEvent;

		this.eventStatus$.pipe(
			filter((status: EventStatus) => status === EventStatus.NOT_DEFINED),
			tap(() => this.findOutCurrentBoardDate()),
			takeUntil(this.destroyedSource)
		).subscribe();

		combineLatest(this.eventStatus$, this.currentDatePeriod$, this.currentBoard$).pipe(
			filter(([status]: [EventStatus, DatePeriod, Board]) => status === EventStatus.NOT_LOADED),
			tap(([_, datePeriod, board]: [EventStatus, DatePeriod, Board]) => this.loadEvents(datePeriod, board.id)),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.events$ = combineLatest(this.eventStatus$, this.boardStoreService.events).pipe(
			filter(([status]: [EventStatus, Event[]]) => status === EventStatus.NOT_PROCESSED),
			withLatestFrom(this.currentUserId$, this.currentBoard$, this.currentEvent$),
			map(([[_, events], currentUserId, board, currentEvent]: [[EventStatus, Event[]], string, Board, Event]) => {
				const processedEvents: Event[] = events.map((event: Event) => this.processEvent(event, currentUserId, board));

				if (currentEvent) {
					this.boardStoreService.setCurrentEvent(processedEvents.find((e: Event) => e.id === currentEvent.id));
				}

				this.boardStoreService.finishBoardEventsProcessing();
				return processedEvents;
			})
		);

		this.loadEventsSource.pipe(
			withLatestFrom(this.currentBoard$),
			tap(([datePeriod, board]: [DatePeriod, Board]) => this.loadEvents(datePeriod, board.id)),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.leaveBoardSource.pipe(
			withLatestFrom(this.currentBoard$),
			tap(([_, board]: [void, Board]) => {
				this.boardStoreService.leaveBoard(board);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.deleteBoardSource.pipe(
			withLatestFrom(this.currentBoard$),
			tap(([_, board]: [void, Board]) => {
				this.boardStoreService.deleteBoard(board);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();
	}

	public ngOnDestroy(): void {
		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	public findOutCurrentBoardDate(): void {

		const dates: Date[] = DateUtil.getWeekdayDates(new Date());

		const date: DatePeriod = {
			from: dates[0],
			to: dates[1]
		};

		this.boardStoreService.setDate(date);

		/*if (!this.currentEvent) {

			const dates: DateUtil.WeekdayDates = DateUtil.getWeekdayDates(new Date());

			const date = {
				from: dates.monday,
				to: dates.saturday
			};

			this.boardStoreService.setDate(date);
		} else {
			this.boardStoreService.setDate(this.currentDatePeriod);
		}*/
	}

	public addEvent(event: Event): void {
		this.boardStoreService.addEvent(event);
	}

	public processEvent(event: Event, currentUserId: string, currentBoard: Board): Event {
		const processedEvent: Event = {
			...event,

			showParticipants: false,
			showGoToBoard: false,
			topCommands: [],
			bottomCommands: [],

			editable: currentBoard.creator.id === currentUserId || currentBoard.moderators.some((m: User) => m.id === currentUserId)

		};

		if (processedEvent.editable) {
			processedEvent.topCommands.push({
				iconName: 'edit',
				tip: 'Edit',
				action: (): void => this.openEventModificator()
			});
			processedEvent.topCommands.push({
				iconName: 'delete',
				tip: 'Delete',
				action: (e: Event): void => this.deleteEvent(e)
			});
		}

		if (processedEvent.participants.some((p: User) => p.id === currentUserId)) {
			processedEvent.bottomCommands.push({
				iconName: 'bookmark',
				tip: 'Remove from my board',
				action: (e: Event): void => this.leaveEvent(e)
			});
		} else {
			processedEvent.bottomCommands.push({
				iconName: 'bookmark_border',
				tip: 'Add to my board',
				action: (e: Event): void => this.acceptEvent(e)
			});
		}

		return processedEvent;
	}

	public addSelectedDate(date: DatePeriod): void {
		this.boardStoreService.addSelectedDate(date);
	}

	public finishGridEventsProcessing(): void {
		this.boardStoreService.finishGridEventsProcessing();
	}

	public addCurrentEvent(event: Event): void {
		this.boardStoreService.setCurrentEvent(event);
	}

	public removeCurrentEvent(): void {
		this.boardStoreService.removeCurrentEvent();
	}

	public deleteEvent(event: Event): void {
		this.boardStoreService.deleteEvent(event);
	}

	public leaveEvent(event: Event): void {
		this.boardStoreService.leaveCurrentEvent(event);
	}

	public acceptEvent(event: Event): void {
		this.boardStoreService.acceptEvent(event);
	}

	public editEvent(event: Event): void {
		this.boardStoreService.editEvent(event);
	}

	public goToBoards(): void {
		this.boardStoreService.removeCurrentEvent();
		this.boardStoreService.removeCurrentBoard();
		this.router.navigate(['/boards']);
	}

	public openBoardModificator(): void {
		this.boardModificatorConfigSource.next({
			type: ModificationType.EDIT
		});
	}

	public editBoard(board: Board): void {
		this.boardStoreService.editBoard(board);
	}

	public openEventModificator(): void {
		this.eventModificatorConfigSource.next({
			type: ModificationType.EDIT
		});
	}

	public loadEvents(date: DatePeriod, currentBoardId: string): void {
		this.boardStoreService.loadEventsByBoardId(date, currentBoardId);
	}

	public onLoadEvents(datePeriod: DatePeriod): void {
		this.loadEventsSource.next(datePeriod);
	}

	public leaveBoard(): void {
		this.leaveBoardSource.next();
	}

	public deleteBoard(): void {
		this.deleteBoardSource.next();
	}
}
