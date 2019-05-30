/* import { Injectable } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Board } from '../domain/Board';
import {Event} from '../domain/Event';
import { DatePeriod } from '../reducers/timeGrig.reducer';
import * as EventDeserializer from '../utils/eventDeserializer';


@Injectable()
export class BoardService {

  private REST_URI = environment.APIEndpoint + 'boards';

  constructor(private http: HttpClient) { }

  public getAll(userId: string): Observable<Board[]> {
    const token = sessionStorage.getItem('mean-token');

    if (token === null) {
      return of([]);
    }

    return this.http.get(
      `${this.REST_URI}?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map((boards: Board[]) => boards),
        catchError((error: Error) => throwError(error))
      );
  }

  public getBoardInvites(userId: string): Observable<Board[]> {
    const token = sessionStorage.getItem('mean-token');

    if (token === null) {
      return of([]);
    }

    return this.http.get(
      `${this.REST_URI}/invites?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map((boards: Board[]) => boards),
        catchError((error: Error) => throwError(error))
      );
  }

  public get(id: string): Observable<Board> {
    const token = sessionStorage.getItem('mean-token');
    if (token === null) {
      return of();
    }

    return this.http.get(
      `${this.REST_URI}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map((board: Board) => board),
        catchError((error: Error) => throwError(error))
      );
  }

  public add(board: Board): Observable<Board> {
    return this.http.post<Board>(
      this.REST_URI,
      board,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }
  public edit(board: Board): Observable<Board> {
    return this.http.put<Board>(
      `${this.REST_URI}`,
      board,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }
  public accept(board: Board): Observable<Board> {
    return this.http.put<Board>(
      `${this.REST_URI + '/accepting'}/${board.id}`,
      board,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }
  public decline(board: Board): Observable<Board> {
    return this.http.put<Board>(
      `${this.REST_URI + '/declining'}/${board.id}`,
      board,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }

  public getEvents(date: DatePeriod, boardId: string): Observable<Event[]> {
    const token = sessionStorage.getItem('mean-token');
    if (token === null) {
      return of([]);
    }
    return this.http.get(
      `${this.REST_URI}/${boardId}/events?from=${date.from.toISOString()}&to=${date.to.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map((events: Event[]) => EventDeserializer.deserializeEvents(events)),
          catchError((error: Error) => throwError(error))
      );
  }
  public leave(board: Board): Observable<Board> {
    return this.http.put<Board>(
      `${this.REST_URI + '/leaving'}/${board.id}`,
      board,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => board),
        catchError((error: Error) => throwError(error))
      );
  }
  public delete(board: Board): Observable<Board> {
    return this.http.delete<Board>(
      `${this.REST_URI }/${board.id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => board),
        catchError((error: Error) => throwError(error))
      );
  }
}
 */