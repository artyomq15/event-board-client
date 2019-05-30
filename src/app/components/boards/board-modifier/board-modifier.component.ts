import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { fromEvent, Observable, ReplaySubject, race, combineLatest } from 'rxjs';

import { User, Board, ModificationType } from 'src/app/store/domain/interfaces';
import { auditTime, map, takeUntil, tap, withLatestFrom, switchMap, publishReplay, refCount, filter } from 'rxjs/operators';
import { AuthStoreService, BoardStoreService } from 'src/app/store/services';
import { UserChipConfig, UserChip } from 'src/app/shared/user-chip/user-chip.component';

interface BoardProperties {
	id: string;
	creator: User;
}

@Component({
	selector: 'app-board-modifier',
	templateUrl: './board-modifier.component.html',
	styleUrls: ['./board-modifier.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardModifierComponent implements OnInit, OnDestroy {

	@Input() public modificationType: ModificationType;

	@Output() public submittedBoard: EventEmitter<Board> = new EventEmitter<Board>();
	@Output() public closedModifier: EventEmitter<void> = new EventEmitter<void>();

	public boardForm: FormGroup;

	public currentBoard$: Observable<Board>;
	public currentUser$: Observable<User>;
	public isFoundUsers$: Observable<boolean>;
	public foundUsers$: Observable<User[]>;
	public moderators$: Observable<User[]>;
	public invitedUsers$: Observable<User[]>;
	public participants$: Observable<User[]>;

	public boardProperties$: Observable<BoardProperties>;

	public participantChips$: Observable<UserChip[]>;
	public invitedChips$: Observable<UserChip[]>;

	public submitted: boolean = false;
	public modification: string;

	private searchElement: HTMLInputElement;

	private addUserSource: ReplaySubject<User> = new ReplaySubject<User>(1);

	private addBoardSource: ReplaySubject<void> = new ReplaySubject<void>(1);
	private editBoardSource: ReplaySubject<void> = new ReplaySubject<void>(1);

	private submitModificationSource: ReplaySubject<{ name: string; isPrivate: boolean}> =
		new ReplaySubject<{ name: string; isPrivate: boolean}>(1);

	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	private SEARCH_DELAY_TIME: number = 500;

	constructor(
		private formBuilder: FormBuilder,
		private boardStoreService: BoardStoreService,
		private authStoreService: AuthStoreService
	) { }

	get form(): { [key: string]: AbstractControl; } { return this.boardForm.controls; }

	public ngOnInit(): void {
		this.currentBoard$ = this.boardStoreService.currentBoard;
		this.currentUser$ = this.authStoreService.currentUser;
		this.foundUsers$ = this.boardStoreService.foundUsers;
		this.isFoundUsers$ = this.foundUsers$.pipe(
			map((users: User[]) => users.length > 0)
		);
		this.moderators$ = this.boardStoreService.boardModificationModerators;
		this.invitedUsers$ = this.boardStoreService.boardModificationInvitedUsers;
		this.participants$ = this.boardStoreService.boardModificationParticipants;

		this.setSearchUserListener();

		this.boardProperties$ = race(
			this.addBoardSource.pipe(
				tap(() => this.modification = 'Add'),
				switchMap(() => this.currentUser$),
				tap((user: User) => this.addParticipants([user])),
				tap(() => this.buildForm('', false)),
				map((user: User) => ({
					id: '',
					creator: user
				}))
			),
			this.editBoardSource.pipe(
				tap(() => this.modification = 'Edit'),
				switchMap(() => this.currentBoard$),
				tap((board: Board) => {
					this.addParticipants(board.participants);
					this.addInvited(board.invited);
					this.boardStoreService.addBoardModerators(board.moderators);
				}),
				tap((board: Board) => this.buildForm(board.name, board.isPrivate)),
				map((board: Board) => ({
					id: board.id,
					creator: board.creator
				}))
			)
		).pipe(
			publishReplay(1),
			refCount()
		);

		// TODO: make chips method

		this.participantChips$ = combineLatest(this.participants$, this.moderators$).pipe(
			withLatestFrom(this.boardProperties$, this.currentUser$),
			map(([[participants, moderators], boardProperties, currentUser]: [[User[], User[]], BoardProperties, User]) => {
				const participantChips: Array<{ user: User; config: UserChipConfig }> = [];

				const moderatorIds: string[] = moderators.map((m: User) => m.id);

				participants.forEach((p: User) => {
					const isCreator: boolean = p.id === boardProperties.creator.id;

					const isModerator: boolean = moderatorIds.includes(p.id);

					const isRemovable: boolean =
						currentUser.id === boardProperties.creator.id && !isCreator ||
						moderatorIds.includes(currentUser.id) && !isCreator && !isModerator;

					const isEditable: boolean = currentUser.id === boardProperties.creator.id;

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

		this.invitedChips$ = combineLatest(this.invitedUsers$, this.moderators$).pipe(
			withLatestFrom(this.boardProperties$, this.currentUser$),
			map(([[invited, moderators], boardProperties, currentUser]: [[User[], User[]], BoardProperties, User]) => {
				const invitedChips: Array<{ user: User; config: UserChipConfig }> = [];

				const moderatorIds: string[] = moderators.map((m: User) => m.id);

				invited.forEach((p: User) => {
					const isCreator: boolean = p.id === boardProperties.creator.id;

					const isModerator: boolean = moderatorIds.includes(p.id);

					const isRemovable: boolean =
						currentUser.id === boardProperties.creator.id && !isCreator ||
						moderatorIds.includes(currentUser.id) && !isCreator && !isModerator;

					const isEditable: boolean = currentUser.id === boardProperties.creator.id;

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
				this.boardProperties$
			),
			filter(([user, currentUser, boardProperties]: [User, User, BoardProperties]) => {
				const isCurrentUser: boolean = user.id === currentUser.id;
				const isCreator: boolean = user.id === boardProperties.creator.id;

				return !isCurrentUser && !isCreator;
			}),
			tap(([user]: [User, User, BoardProperties]) => {
				this.boardStoreService.addBoardInvitedUser(user);
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.submitModificationSource.pipe(
			withLatestFrom(this.boardProperties$, this.participants$, this.moderators$, this.invitedUsers$),
			map(([{ name, isPrivate}, boardProperties, participants, moderators, invited]: [
				{ name: string, isPrivate: boolean}, BoardProperties, User[], User[], User[]
			]) =>
				({
					id: boardProperties.id,
					creator: boardProperties.creator,
					isPrivate: isPrivate,
					name,
					moderators,
					participants,
					invited
				} as Board)
			),
			tap((board: Board) => this.submittedBoard.emit(board)),
			tap(() => {
				this.submitted = false;
				this.boardForm.reset();
				this.clearModificationStore();
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		if (this.modificationType === ModificationType.ADD) {
			this.addBoardSource.next();
		} else {
			this.editBoardSource.next();
		}
	}

	public closeModifier(): void {
		this.closedModifier.emit();
	}

	public addUser(user: User): void {
		this.addUserSource.next(user);
	}

	public addParticipants(users: User[]): void {
		this.boardStoreService.addBoardParticipants(users);
	}

	public addInvited(users: User[]): void {
		this.boardStoreService.addBoardInvitedUsers(users);
	}

	public setModerator(user: User, flag: boolean): void {
		if (flag) {
			this.boardStoreService.addBoardModerator(user);
		} else {
			this.boardStoreService.deleteBoardModerator(user.id);
		}
	}

	public deleteBoardUser(id: string): void {
		this.boardStoreService.deleteBoardUser(id);
	}

	public submit(): void {
		this.submitted = true;

		if (this.boardForm.invalid) {
			return;
		}

		this.submitModificationSource.next({
			name: this.form.name.value,
			isPrivate: this.form.isPrivate.value
		});
	}

	public ngOnDestroy(): void {
		this.clearModificationStore();

		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	private buildForm(defaultName: string, isPrivate: boolean): void {
		this.boardForm = this.formBuilder.group({
			name: [
				defaultName,
				[
					Validators.required,
					Validators.pattern(/^[\w'",.!? ]+$/i)
				]
			],
			isPrivate: [isPrivate]
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

	private clearModificationStore(): void {
		this.boardStoreService.addBoardModerators([]);
		this.boardStoreService.addBoardParticipants([]);
		this.boardStoreService.addBoardInvitedUsers([]);
		this.boardStoreService.searchUsers('');
	}
}
