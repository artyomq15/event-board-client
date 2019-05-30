/* import { Injectable } from '@angular/core';

import { Event } from '../domain/Event';
import { Observable, throwError, of } from 'rxjs';
import { DatePeriod } from '../reducers/timeGrig.reducer';

import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import * as EventDeserializer from '../utils/eventDeserializer';
import {User} from '../domain/User';


@Injectable()
export class EventService {

  private REST_URI = environment.APIEndpoint + 'events';

  constructor(private http: HttpClient) { }

  public add(event: Event): Observable<Event> {
    console.log(event);

    return this.http.post<Event>(
      this.REST_URI,
      event,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }
  public findCollisions(user: User, date: DatePeriod): Observable<Event[]> {
    return this.http.get(
      `${this.REST_URI + '/collisions'}?with=${user.id}&from=${date.from.toISOString()}&to=${date.to.toISOString()}`,
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
  public getEvents(date: DatePeriod, userId: string): Observable<Event[]> {
    const token = sessionStorage.getItem('mean-token');
    if (token === null) {
      return of([]);
    }
    return this.http.get(
      `${this.REST_URI}?from=${date.from.toISOString()}&to=${date.to.toISOString()}&userId=${userId}`,
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

  public getEventInvites(userId: string): Observable<Event[]> {
    const token = sessionStorage.getItem('mean-token');

    return this.http.get(
      `${this.REST_URI}/invites?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map((events: Event[]) => EventDeserializer.deserializeEvents(events)),
        catchError((error: Error) => throwError(error))
      );
  }

  public deleteEvent(event: Event): Observable<Event> {
    return this.http.delete<Event>(
      `${this.REST_URI}/${event.id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => event),
        catchError((error: Error) => throwError(error))
      );
  }

  public editEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(
      `${this.REST_URI}/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => event),
        catchError((error: Error) => throwError(error))
      );
  }
  public leaveEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(
      `${this.REST_URI + '/deleteParticipant'}/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => event),
        catchError((error: Error) => throwError(error))
      );
  }
  public acceptEvent(event: Event): Observable<Event> {
    console.log(event);
    return this.http.put<Event>(
      `${this.REST_URI + '/acceptEvent'}/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => event),
        catchError((error: Error) => throwError(error))
      );
  }
  public declineEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(
      `${this.REST_URI + '/declineEvent'}/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map(() => event),
        catchError((error: Error) => throwError(error))
      );
  }

}
 */