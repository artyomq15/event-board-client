import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Board, BoardSearch } from '../domain/interfaces';
import { BoardMapper } from 'src/app/services/mappers';

@Injectable()
export class BoardDataService {

	private REST_URI: string = environment.APIEndpoint + 'boards';

	constructor(private http: HttpClient) { }

	public getAll(userId: string): Observable<Board[]> {

		return this.http.get(`${this.REST_URI}?userId=${userId}`)
			.pipe(
				map((boards: any[]) => BoardMapper.mapMany(boards))
			);
	}

	public getBoardInvites(userId: string): Observable<Board[]> {

		return this.http.get(`${this.REST_URI}/invites?userId=${userId}`)
			.pipe(
				map((boards: any[]) => BoardMapper.mapMany(boards))
			);
	}

	public get(id: string): Observable<Board> {

		return this.http.get(`${this.REST_URI}/${id}`)
			.pipe(
				map((board: any) => BoardMapper.mapOne(board))
			);
	}

	public add(board: Board): Observable<Board> {
		return this.http.post<Board>(this.REST_URI, board);
	}

	public edit(board: Board): Observable<Board> {
		return this.http.put<Board>(`${this.REST_URI}`, board);
	}

	public accept(id: string): Observable<void> {
		return this.http.put<void>(`${this.REST_URI}/accepting`, { id });
	}

	public enter(id: string): Observable<void> {
		return this.http.put<void>(`${this.REST_URI}/entering`, { id });
	}

	public decline(id: string): Observable<void> {
		return this.http.put<void>(`${this.REST_URI}/declining`, { id });
	}

	public leave(board: Board): Observable<Board> {
		return this.http.put<Board>(`${this.REST_URI + '/leaving'}/${board.id}`, board)
			.pipe(
				map(() => board)
			);
	}

	public delete(board: Board): Observable<Board> {
		return this.http.delete<Board>(`${this.REST_URI}/${board.id}`)
			.pipe(
				map(() => board)
			);
	}

	public search(query: string): Observable<BoardSearch[]> {

		query = query.trim().toLowerCase();

		/*if (!query) {
			return of([]);
		}*/

		return this.http.get<BoardSearch[]>(`${this.REST_URI}/search?query=${query}`);
	}
}
