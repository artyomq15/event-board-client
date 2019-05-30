import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class TokenNotExistsGuard implements CanActivate {

	constructor(
		private router: Router,
		private localStorageService: LocalStorageService
	) { }

	public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (this.localStorageService.getToken() === null) {
			return true;
		}
		this.router.navigate(['/']);
		return false;
	}
}
