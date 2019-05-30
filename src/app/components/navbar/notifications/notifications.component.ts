import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, delay } from 'rxjs/operators';
import { trigger, state, style } from '@angular/animations';
import { Board, Event, User } from 'src/app/store/domain/interfaces';
import { BoardStoreService } from 'src/app/store/services';

interface Invite {
	type: string;
	data: Event | Board;
	onAccept: () => void;
	onDecline: () => void;
}

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss', '../../../shared/icon.scss'],
	animations: [
		trigger('openClose', [
			state('true', style({
				height: '500px',
				width: '400px',
				borderRadius: '25px',
				position: 'absolute',
				top: '5px',
				right: '5px'
			})),
			state('false', style({
				height: '50px',
				width: '50px',
				borderRadius: '50px',
				position: 'relative'
			}))
		])
	]
})

export class NotificationsComponent implements OnInit {

	@Input()
	public user: User;

	public isNotificationsOpened$: Observable<boolean>;

	public invites$: Observable<Invite[]>;
	public invitesCount$: Observable<number>;

	private invitedBoards$: Observable<Invite[]>;
	private invitedEvents$: Observable<Invite[]>;

	private TRANSITION_DELAY: number = 300;

	private isNotificationsOpenedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private boardStoreService: BoardStoreService
	) {}

	public ngOnInit(): void {
		this.isNotificationsOpened$ = this.isNotificationsOpenedSource.asObservable().pipe(
			distinctUntilChanged()
		);

		this.invitedBoards$ = this.boardStoreService.boardInvites.pipe(
			map((boards: Board[]) => boards.map((board: Board) => ({
				type: 'Board',
				data: board,
				onAccept: (): void => this.acceptBoardInvite(board),
				onDecline: (): void => this.declineBoardInvite(board)
			})))
		);

		this.invitedEvents$ = this.boardStoreService.eventInvites.pipe(
			map((events: Event[]) => events.map((event: Event) => ({
				type: 'Event',
				data: event,
				onAccept: (): void => this.acceptEventInvite(event),
				onDecline: (): void => this.declineEventInvite(event)
			})))
		);

		this.invites$ = combineLatest(this.invitedBoards$, this.invitedEvents$).pipe(
			map(([boards, events]: [Invite[], Invite[]]) => [...boards, ...events]),
			delay(this.TRANSITION_DELAY)
		);

		this.invitesCount$ = this.invites$.pipe(
			map((invites: Invite[]) => invites.length)
		);
	}

	public acceptBoardInvite(board: Board): void {
		this.boardStoreService.accept(board);
	}

	public declineBoardInvite(board: Board): void {
		this.boardStoreService.decline(board);
	}

	public acceptEventInvite(event: Event): void {
		this.boardStoreService.acceptEvent(event);
	}

	public declineEventInvite(event: Event): void {
		this.boardStoreService.declineEvent(event);
	}

	public openNotifications(): void {
		this.isNotificationsOpenedSource.next(true);
	}

	public closeNotifications(): void {
		this.isNotificationsOpenedSource.next(false);
	}
}
