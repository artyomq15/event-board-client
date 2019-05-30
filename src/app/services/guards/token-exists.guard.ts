import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthStoreService } from '../../store/services';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class TokenExistsGuard implements CanActivate {

  constructor(
	private router: Router,
	private authStoreService: AuthStoreService,
	private localStorageService: LocalStorageService
  ) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
	if (this.localStorageService.getToken() === null) {

		this.router.navigate(['/sign-in']);
		return false;
	}

	// this.authStoreService.getCurrentUserProfile();
	return true;
  }

}
