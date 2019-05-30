import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';

import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { AuthStoreService } from 'src/app/store/services';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

	public isSignIn$: Observable<boolean> = new Observable<boolean>();

	private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	constructor(
		private authStoreService: AuthStoreService,
		private router: Router,
		private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.authStoreService.isLoggedIn.pipe(
			tap((isLoggedIn: boolean) => {
				if (isLoggedIn) {
					this.router.navigate(['/boards']);
				}
			}),
			takeUntil(this.destroyedSource)
		).subscribe();

		this.isSignIn$ = this.route.url.pipe(
			map((url: UrlSegment[]) => url[0].path === 'sign-in'),
			takeUntil(this.destroyedSource),
		);
	}

	public ngOnDestroy(): void {
		this.destroyedSource.next(true);
		this.destroyedSource.complete();
	}
}
