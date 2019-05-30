import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable, ReplaySubject, Subject, BehaviorSubject, fromEvent } from 'rxjs';

import { Router } from '@angular/router';

import { Board, User, ModificationType, BoardsStatus, BoardSearch } from 'src/app/store/domain/interfaces';
import { BoardStoreService, AuthStoreService } from 'src/app/store/services';
import { map, tap, takeUntil, switchMap, filter, publishReplay, refCount, distinctUntilChanged, auditTime } from 'rxjs/operators';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: [
		'../../shared/icon.scss',
		'./boards.component.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit, OnDestroy {

	public currentUserId$: Observable<string>;
	public boards$: Observable<Board[]>;
	public foundBoards$: Observable<BoardSearch[]>;

	public boardsStatus$: Observable<BoardsStatus>;

	public isSearchActive$: Observable<boolean>;

	public configSource: Subject<any> = new Subject<any>();

	private searchElement: HTMLInputElement;
	private SEARCH_DELAY_TIME: number = 500;

	private getBoardsSource: Subject<void> = new Subject<void>();
	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	private isSearchActiveSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private authStoreService: AuthStoreService,
		private boardStoreService: BoardStoreService,
		private router: Router

	) { }

	public ngOnInit(): void {

		this.setSearchBoardsListener();

		this.foundBoards$ = this.boardStoreService.foundBoards;

		this.isSearchActive$ = this.isSearchActiveSource.asObservable().pipe(
			distinctUntilChanged(),
			tap((isActive: boolean) => {
				if (isActive) {
					this.searchElement.value = '';
					this.boardStoreService.searchBoards('');
				}
			})
		);

		this.currentUserId$ = this.authStoreService.currentUser.pipe(
			filter((user: User) => user !== null),
			map((user: User) => user.id),
			publishReplay(1),
			refCount()
		);

		this.getBoardsSource.pipe(
			switchMap(() => this.currentUserId$),
			tap((id: string) => this.boardStoreService.loadBoards(id)),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.getBoardsSource.next();

		this.boards$ = this.boardStoreService.boards;

		this.boardStoreService.boardsStatus.pipe(
			filter((status: BoardsStatus) => status === BoardsStatus.OBSOLETE),
			tap(() => this.getBoardsSource.next()),
			takeUntil(this.destroyedSource)
		).subscribe();
	}

	public ngOnDestroy(): void {
		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}

	public goToBoard(id: string): void {
		this.router.navigate(['/boards', id]);
	}

	public acceptAndGoToBoard(boardSearch: BoardSearch): void {
		if (boardSearch.isParticipant) {
			this.goToBoard(boardSearch.id);
		} else {
			this.boardStoreService.enterBoard(boardSearch.id, true);
		}
	}

	public openBoardModificator(): void {
		this.configSource.next({
			type: ModificationType.ADD
		});
	}

	public addBoard(board: Board): void {
		this.boardStoreService.addBoard(board);
	}

	public activateSearch(): void {
		this.isSearchActiveSource.next(true);
	}

	public deactivateSearch(): void {
		this.isSearchActiveSource.next(false);
	}

	private setSearchBoardsListener(): void {
		this.searchElement = document.getElementById('search-board') as HTMLInputElement;

		fromEvent(this.searchElement, 'keyup')
			.pipe(
				auditTime(this.SEARCH_DELAY_TIME),
				map((e: any) => e.target.value),
				takeUntil(this.destroyedSource)
			)
			.subscribe((query: string) => {
				this.boardStoreService.searchBoards(query);
			});
	}

}
