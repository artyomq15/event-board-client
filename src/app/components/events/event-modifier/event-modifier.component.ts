import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';

import { fromEvent, Observable, ReplaySubject, race } from 'rxjs';
import { auditTime, map, refCount, tap, switchMap, withLatestFrom, takeUntil, publishReplay, filter } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { validateTime } from './util/time.validator';
import { convertToInputString } from './util/time.converter';
import { User, Event, DatePeriod, Board, ModificationType } from 'src/app/store/domain/interfaces';
import { AuthStoreService, BoardStoreService } from 'src/app/store/services';
import { UserChip, UserChipConfig } from 'src/app/shared/user-chip/user-chip.component';

interface EventProperties {
	id: string;
	creator: User;
	board: Board;
}
@Component({
	selector: 'app-event-modifier',
	templateUrl: './event-modifier.component.html',
	styleUrls: ['./event-modifier.component.scss']
})
export class EventModifierComponent implements OnInit, OnDestroy {

	@Input() public modificationType: ModificationType;

	@Output() public submittedEvent: EventEmitter<Event> = new EventEmitter<Event>();
	@Output() public closedModifier: EventEmitter<any> = new EventEmitter<any>();

	public eventForm: FormGroup;
	public submitted: boolean = false;
	public modification: string;

	public currentEvent$: Observable<Event>;
	public currentUser$: Observable<User>;
	public foundUsers$: Observable<User[]>;
	public isFoundUsers$: Observable<boolean>;
	public participants$: Observable<User[]>;
	public invitedUsers$: Observable<User[]>;
	public selectedDate$: Observable<DatePeriod>;
	public currentBoard$: Observable<Board>;

	public participantChips$: Observable<UserChip[]>;
	public invitedChips$: Observable<UserChip[]>;

	private searchElement: HTMLInputElement;
	private SEARCH_DELAY_TIME: number = 500;

	private eventProperties$: Observable<any>;

	private addUserSource: ReplaySubject<User> = new ReplaySubject<User>(1);

	private addEventSource: ReplaySubject<void> = new ReplaySubject<void>(1);
	private editEventSource: ReplaySubject<void> = new ReplaySubject<void>(1);

	private submitModificationSource: ReplaySubject<any> = new ReplaySubject<any>(1);

	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	constructor(
		private boardStoreService: BoardStoreService,
		private authStoreService: AuthStoreService,
		private formBuilder: FormBuilder,

	) { }

	get form(): { [key: string]: AbstractControl; } { return this.eventForm.controls; }
	get time(): { [key: string]: AbstractControl; } { return (this.form.time as FormGroup).controls; }

	public ngOnInit(): void {

		this.currentEvent$ = this.boardStoreService.currentEvent;
		this.currentUser$ = this.authStoreService.currentUser;
		this.foundUsers$ = this.boardStoreService.foundUsers;
		this.isFoundUsers$ = this.foundUsers$.pipe(
			map((users: User[]) => users.length > 0)
		);
		this.participants$ = this.boardStoreService.eventModificationParticipants;
		this.invitedUsers$ = this.boardStoreService.eventModificationInvitedUsers;
		this.selectedDate$ = this.boardStoreService.selectedDatePeriod;
		this.currentBoard$ = this.boardStoreService.currentBoard;

		this.setSearchUserListener();

		this.eventProperties$ = race(
			this.addEventSource.pipe(
				tap(() => this.modification = 'Add'),
				switchMap(() => this.currentUser$),
				tap((user: User) => {
					this.removeInvitedUsers();
					this.boardStoreService.addEventParticipants([user]);
				}),
				withLatestFrom(this.selectedDate$, this.currentBoard$),
				tap(([_user, selectedDate]: [User, DatePeriod, Board]) => this.buildForm('', '', selectedDate.from, selectedDate.to)),
				map(([user, selectedDate, board]: [User, DatePeriod, Board]) => ({
					id: '',
					creator: user,
					board
				}))
			) as any,
			this.editEventSource.pipe(
				tap(() => this.modification = 'Edit'),
				switchMap(() => this.currentEvent$),
				tap((event: Event) => {
					this.boardStoreService.addEventParticipants(event.participants);
					this.boardStoreService.addEventInvitedUsers(event.invited);
				}),
				tap((event: Event) => this.buildForm(
					event.name,
					event.description,
					event.timeFrom,
					event.timeTo
				)),
				withLatestFrom(this.currentBoard$),
				map(([event, board]: [Event, Board]) => ({
					id: event.id,
					creator: event.creator,
					board
				}))
			) as any
		).pipe(
			publishReplay(1),
			refCount()
		);

		this.participantChips$ = this.participants$.pipe(
			withLatestFrom(this.eventProperties$, this.currentUser$),
			map(([participants, eventProperties, currentUser]: [User[], EventProperties, User]) => {
				const participantChips: Array<{ user: User; config: UserChipConfig }> = [];

				participants.forEach((p: User) => {
					const isCreator: boolean = p.id === eventProperties.creator.id;

					const isModerator: boolean = false;

					const isRemovable: boolean =
						currentUser.id === eventProperties.creator.id && !isCreator;

					const isEditable: boolean = currentUser.id === eventProperties.creator.id;

					participantChips.push({
						user: p,
						config: {
							isRemovable,
							isEditable,
							isModerator,
							isCreator,
						}
					});
				});

				return participantChips;
			}),
			takeUntil(this.destroyedSource),
			publishReplay(1),
			refCount()
		);

		this.invitedChips$ = this.invitedUsers$.pipe(
			withLatestFrom(this.eventProperties$, this.currentUser$),
			map(([invited, eventProperties, currentUser]: [User[], EventProperties, User]) => {
				const invitedChips: Array<{ user: User; config: UserChipConfig }> = [];

				invited.forEach((p: User) => {
					const isCreator: boolean = p.id === eventProperties.creator.id;

					const isModerator: boolean = false;

					const isRemovable: boolean =
						currentUser.id === eventProperties.creator.id && !isCreator;

					const isEditable: boolean = currentUser.id === eventProperties.creator.id;

					invitedChips.push({
						user: p,
						config: {
							isRemovable,
							isEditable,
							isModerator,
							isCreator,
						}
					});
				});

				return invitedChips;
			}),
			takeUntil(this.destroyedSource),
			publishReplay(1),
			refCount()
		);

		this.addUserSource.pipe(
			tap(() => {
				this.boardStoreService.searchUsers('');
				this.searchElement.value = '';
			}),
			withLatestFrom(
				this.currentUser$,
				this.eventProperties$
			),
			filter(([user, currentUser, eventProperties]: [User, User, EventProperties]) => {
				const isCurrentUser: boolean = user.id === currentUser.id;
				const isCreator: boolean = user.id === eventProperties.creator.id;

				return !isCurrentUser && !isCreator;
			}),
			tap(([user]: [User, User, EventProperties]) => {
				this.boardStoreService.addEventInvitedUser(user);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.submitModificationSource.pipe(
			withLatestFrom(this.eventProperties$, this.participants$, this.invitedUsers$),
			map(([{name, description, timeFrom, timeTo}, eventProperties, participants, invited]: [any, EventProperties, User[], User[]]) =>
				({
					id: eventProperties.id,
					creator: eventProperties.creator,
					board: eventProperties.board,
					timeFrom,
					timeTo,
					name,
					description,
					participants,
					invited,
					color: '#eee'
				} as Event)
			),
			tap((event: Event) => this.submittedEvent.emit(event)),
			tap(() => {
				this.submitted = false;
				this.eventForm.reset();
				this.removeParticipants();
				this.removeInvitedUsers();
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		if (this.modificationType === ModificationType.ADD) {
			this.addEventSource.next();
		} else {
			this.editEventSource.next();
		}
	}

	public closeModifier(): void {
		this.removeInvitedUsers();
		this.closedModifier.emit();
	}

	public removeParticipants(): void {
		this.boardStoreService.addEventParticipants([]);
	}

	public removeInvitedUsers(): void {
		this.boardStoreService.addEventInvitedUsers([]);
	}

	public addUser(user: User): void {
		this.addUserSource.next(user);
	}

	public deleteEventUser(id: string): void {
		this.boardStoreService.removeUser(id);
	}

	public submit(): void {
		this.submitted = true;

		if (this.eventForm.invalid) {
			return;
		}

		this.submitModificationSource.next({
			name: this.form.name.value,
			description: this.form.description.value,
			timeFrom: new Date(this.time.timeFrom.value),
			timeTo: new Date(this.time.timeTo.value)
		});
	}

	public ngOnDestroy(): void {
		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	private buildForm(name: string, description: string, timeFrom: Date, timeTo: Date): void {
		this.eventForm = this.formBuilder.group({
			name: [
				name,
				[
					Validators.required,
					Validators.pattern(/^[\w'",.!? ]+$/i)
				]
			],
			description: [
				description,
				Validators.required
			],
			time: this.formBuilder.group({
				timeFrom: [
					convertToInputString(timeFrom),
					Validators.required
				],
				timeTo: [
					convertToInputString(timeTo),
					Validators.required
				]
			}, { validator: validateTime })
		});
	}

	private setSearchUserListener(): void {
		this.searchElement = document.getElementById('search-participant') as HTMLInputElement;

		fromEvent(this.searchElement, 'keyup')
			.pipe(
				auditTime(this.SEARCH_DELAY_TIME),
				map((e: any) => e.target.value)
			)
			.subscribe((query: string) => {
				this.boardStoreService.searchUsers(query);
			});
	}

}
