import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, ReplaySubject, combineLatest } from 'rxjs';

import * as DateUtil from '../../utils/date.util';

import { MatDialog } from '@angular/material';
import { Event, DatePeriod, EventStatus, User, ModificationType } from 'src/app/store/domain/interfaces';
import { BoardStoreService, AuthStoreService } from 'src/app/store/services';
import { filter, map, publishReplay, refCount, tap, takeUntil, withLatestFrom, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-my-board',
	templateUrl: './my-board.component.html',
	styleUrls: [
		'../../../shared/icon.scss',
		'../../../shared/board-panel.scss',
		'./my-board.component.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBoardComponent implements OnInit, OnDestroy {

	@ViewChild('addTemplate') public addTemplate: TemplateRef<any>;

	public events$: Observable<Event[]>;
	public eventStatus$: Observable<EventStatus>;
	public currentEvent$: Observable<Event>;
	public currentDatePeriod$: Observable<DatePeriod>;
	public currentUserId$: Observable<string>;

	public eventModificatorConfigSource: ReplaySubject<any> = new ReplaySubject<any>();

	private loadEventsSource: ReplaySubject<DatePeriod> = new ReplaySubject<DatePeriod>(1);
	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	constructor(
		private boardStoreService: BoardStoreService,
		private authStoreService: AuthStoreService,
		private router: Router,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void {

		this.boardStoreService.loadMyBoard();

		this.currentUserId$ = this.authStoreService.currentUser.pipe(
			filter((user: User) => user !== null),
			map((user: User) => user.id),
			publishReplay(1),
			refCount()
		);

		this.currentEvent$ = this.boardStoreService.currentEvent.pipe(
			publishReplay(1),
			refCount()
		);

		this.currentDatePeriod$ = this.boardStoreService.currentDatePeriod.pipe(
			filter(({from, to}: DatePeriod) => from !== null && to !== null),
			publishReplay(1),
			refCount()
		);

		this.eventStatus$ = this.boardStoreService.status.pipe(
			publishReplay(1),
			refCount()
		);

		this.eventStatus$.pipe(
			filter((status: EventStatus) => status === EventStatus.NOT_DEFINED),
			tap(() => this.findOutCurrentBoardDate()),
			takeUntil(this.destroyedSource)
		).subscribe();

		combineLatest(this.eventStatus$, this.currentDatePeriod$, this.currentUserId$).pipe(
			filter(([status]: [EventStatus, DatePeriod, string]) => status === EventStatus.NOT_LOADED),
			tap(([_, datePeriod, id]: [EventStatus, DatePeriod, string]) => this.loadEvents(datePeriod, id)),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.events$ = combineLatest(this.eventStatus$, this.boardStoreService.events).pipe(
			filter(([status]: [EventStatus, Event[]]) => status === EventStatus.NOT_PROCESSED),
			withLatestFrom(this.currentUserId$, this.currentEvent$),
			map(([[_, events], currentUserId, currentEvent]: [[EventStatus, Event[]], string, Event]) => {
				const processedEvents: Event[] = events.map((event: Event) => this.processEvent(event, currentUserId));

				if (currentEvent) {
					this.boardStoreService.setCurrentEvent(processedEvents.find((e: Event) => e.id === currentEvent.id));
				}

				this.boardStoreService.finishBoardEventsProcessing();
				return processedEvents;
			})
		);

		this.loadEventsSource.pipe(
			withLatestFrom(this.currentUserId$),
			tap(([datePeriod, id]: [DatePeriod, string]) => this.loadEvents(datePeriod, id)),
			takeUntil(this.destroyedSource)
		).subscribe();

	}

	public ngOnDestroy(): void {
		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	public addEvent(event: Event): void {
		this.boardStoreService.addEvent(event);
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

			const date: DatePeriod = {
				from: dates.monday,
				to: dates.saturday
			};

			this.boardStoreService.setDate(date);
		} else {
			this.boardStoreService.setDate(this.currentDatePeriod);
		}*/
	}

	public processEvent(event: Event, currentUserId: string): Event {
		const processedEvent: Event = {
			...event,

			showParticipants: !event.board,
			showGoToBoard: !!event.board,
			topCommands: [],
			bottomCommands: [],

			editable: !event.board && event.creator.id === currentUserId
		};

		if (!processedEvent.board) {
			if (processedEvent.creator.id === currentUserId) {
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
			} else {
				processedEvent.topCommands.push({
					iconName: 'exit_to_app',
					tip: 'Leave',
					action: (e: Event): void => this.leaveEvent(e)
				});
			}
		} else {
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
		}

		return processedEvent;
	}

	public openEventModificator(): void {
		this.eventModificatorConfigSource.next({
			type: ModificationType.EDIT
		});
	}

	public addSelectedDate(date: DatePeriod): void {
		this.boardStoreService.addSelectedDate(date);
	}

	public finishGridEventsProcessing(): void {
		this.boardStoreService.finishGridEventsProcessing();
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

	public goToBoards(): void {
		this.boardStoreService.removeCurrentEvent();
		this.router.navigate(['/boards']);
	}

	public addCurrentEvent(event: Event): void {
		this.boardStoreService.setCurrentEvent(event);
	}

	public removeCurrentEvent(): void {
		this.boardStoreService.removeCurrentEvent();
	}

	public onLoadEvents(datePeriod: DatePeriod): void {
		this.loadEventsSource.next(datePeriod);
	}

	public loadEvents(date: DatePeriod, currentUserId: string): void {
		this.boardStoreService.loadEvents(date, currentUserId);
	}

	public declineEvent(event: Event): void {
		this.boardStoreService.declineEvent(event);
		this.ngOnInit();
	}

	public editEvent(event: Event): void {
		this.boardStoreService.editEvent(event);
	}

	public loadTemplate(event: Event): TemplateRef<any> {
		return this.addTemplate;
	}
}
