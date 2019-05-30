import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from '../domain/interfaces';

export interface TokenResponse {
	token: string;
}

@Injectable()
export class AuthDataService {

	constructor(private http: HttpClient) { }

	public register(user: User): Observable<TokenResponse> {
		return this.http.post(`${environment.APIEndpoint}register`, user)
			.pipe(
				map((data: TokenResponse) => data)
			);
	}

	public login(email: string, password: string): Observable<TokenResponse> {
		return this.http.post(
			`${environment.APIEndpoint}login`, { email, password })
			.pipe(
				map((data: TokenResponse) => data)
		);
	}
}
