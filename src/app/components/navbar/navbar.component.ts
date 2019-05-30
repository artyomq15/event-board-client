import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/store/domain/interfaces';

import { AuthStoreService, BoardStoreService } from 'src/app/store/services';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

	public isLoggedIn$: Observable<boolean>;
	public user$: Observable<User>;

	constructor(
		private authStoreService: AuthStoreService,
		private boardStoreService: BoardStoreService
	) {}

	public ngOnInit(): void {
		this.isLoggedIn$ = this.authStoreService.isLoggedIn;
		this.user$ = this.authStoreService.currentUser.pipe(
			tap((user: User) => {
				if (user) {
					this.boardStoreService.loadBoardInvites(user.id);
					this.boardStoreService.loadEventInvites(user.id);
				}
			})
		);
	}
}
