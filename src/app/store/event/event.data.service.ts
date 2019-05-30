import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User, Event, DatePeriod } from '../domain/interfaces';
import { EventMapper } from 'src/app/services/mappers';

@Injectable()
export class EventDataService {

	private REST_EVENT_URI: string = environment.APIEndpoint + 'events';
	private REST_BOARD_URI: string = environment.APIEndpoint + 'boards';

	constructor(private http: HttpClient) { }

	public add(event: Event): Observable<Event> {
		return this.http.post<Event>(this.REST_EVENT_URI, event);
	}

	public findCollisions(user: User, date: DatePeriod): Observable<Event[]> {
		return this.http.get(
			`${this.REST_EVENT_URI + '/collisions'}?with=${user.id}&from=${date.from.toISOString()}&to=${date.to.toISOString()}`)
			.pipe(
				map((events: Event[]) => EventMapper.mapMany(events))
			);
	}

	public getEvents(date: DatePeriod, userId: string): Observable<Event[]> {
		return this.http.get(`${this.REST_EVENT_URI}?from=${date.from.toISOString()}&to=${date.to.toISOString()}&userId=${userId}`)
			.pipe(
				map((events: Event[]) => EventMapper.mapMany(events))
			);
	}

	public getEventInvites(userId: string): Observable<Event[]> {
		return this.http.get(`${this.REST_EVENT_URI}/invites?userId=${userId}`)
			.pipe(
				map((events: Event[]) => EventMapper.mapMany(events))
			);
	}

	public getEventsByBoardId(date: DatePeriod, boardId: string): Observable<Event[]> {
		return this.http.get(`${this.REST_BOARD_URI}/${boardId}/events?from=${date.from.toISOString()}&to=${date.to.toISOString()}`)
			.pipe(
				map((events: Event[]) => EventMapper.mapMany(events))
			);
	}

	public deleteEvent(event: Event): Observable<Event> {
		return this.http.delete<Event>(`${this.REST_EVENT_URI}/${event.id}`)
			.pipe(
				map(() => event),
			);
	}

	public editEvent(event: Event): Observable<Event> {
		return this.http.put<Event>(`${this.REST_EVENT_URI}/${event.id}`, event)
			.pipe(
				map(() => event),
			);
	}

	public leaveEvent(event: Event): Observable<Event> {
		return this.http.put<Event>(`${this.REST_EVENT_URI + '/deleteParticipant'}/${event.id}`, event)
			.pipe(
				map(() => event)
			);
	}

	public acceptEvent(id: string): Observable<void> {
		return this.http.post<void>(`${this.REST_EVENT_URI}/accepting`, { id });
	}

	public declineEvent(id: string): Observable<void> {
		return this.http.post<void>(`${this.REST_EVENT_URI}/declining`,	{ id });
	}

}
