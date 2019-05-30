import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenExistsGuard } from './guards/token-exists.guard';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(public guard: TokenExistsGuard, private localStorageService: LocalStorageService) { }

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (this.guard.canActivate()) {
			request = request.clone({
				setHeaders: {
					Accept: 'application/json',
					Authorization: `Bearer ${this.localStorageService.getToken()}`
				}
			});
		}

		return next.handle(request);
	}
}
