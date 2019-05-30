import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from '../domain/interfaces';
import { UserMapper } from 'src/app/services/mappers';

@Injectable()
export class UserDataService {

	private REST_URI = environment.APIEndpoint + 'user';
	private REST_URI_PROFILE = this.REST_URI + '/profile';

	constructor(private http: HttpClient) { }

	public searchUser(query: string): Observable<User[]> {

		query = query.trim().toLowerCase();

		if (!query) {
			return of([]);
		}

		return this.http.get(`${this.REST_URI}/search?query=${query}`)
			.pipe(
				map((users: any) => UserMapper.mapMany(users))
			);

	}

	public getProfile(): Observable<User> {
		return this.http.get(this.REST_URI_PROFILE)
			.pipe(
                map((users: any) => UserMapper.mapOne(users))
			);
	}
}
