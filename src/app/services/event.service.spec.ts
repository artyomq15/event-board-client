/* import { EventService } from './event.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';

import * as mock from '../../testing/mock';

describe('Event Service', () => {
    let service: EventService;
    let httpMock: HttpTestingController;


  beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EventService],
        });

        service = TestBed.get(EventService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#add', () => {

        it('should call http post method', () => {
            service.add(mock.event).subscribe();

            const http = httpMock.expectOne(`${environment.APIEndpoint}events`);
            expect(http.request.method).toBe('POST');
            expect(http.request.body).toEqual(mock.event);
        });

        it('should throw error', () => {
            service.add(mock.event).subscribe(
                () => {},
                (error) => expect(error.error.type).toBe('ERROR')
            );
            const http = httpMock.expectOne(`${environment.APIEndpoint}events`);
            http.error(new ErrorEvent('ERROR'));
        });

    });

    describe('#deleteEvent', () => {

        it('should call http delete method', () => {
            service.deleteEvent(mock.event).subscribe(
                (event) => expect(event).toEqual(mock.event)
            );
            const http = httpMock.expectOne(`${environment.APIEndpoint}events/${mock.event.id}`);
            expect(http.request.method).toBe('DELETE');
        });

        it('should throw error', () => {
            service.deleteEvent(mock.event).subscribe(
                () => {},
                (error) => expect(error.error.type).toBe('ERROR')
            );
            const http = httpMock.expectOne(`${environment.APIEndpoint}events/${mock.event.id}`);
            http.error(new ErrorEvent('ERROR'));
        });

    });

    describe('#editEvent', () => {

        it('should call http put method', () => {
            service.editEvent(mock.event).subscribe(
                (event) => expect(event).toEqual(mock.event)
            );
            const http = httpMock.expectOne(`${environment.APIEndpoint}events/${mock.event.id}`);
            expect(http.request.method).toBe('PUT');
            expect(http.request.body).toEqual(mock.event);
        });

        it('should throw error', () => {
            service.editEvent(mock.event).subscribe(
                () => {},
                (error) => expect(error.error.type).toBe('ERROR')
            );
            const http = httpMock.expectOne(`${environment.APIEndpoint}events/${mock.event.id}`);
            http.error(new ErrorEvent('ERROR'));
        });

    });
  describe('#leaveEvent', () => {

    it('should call http put method', () => {
      service.leaveEvent(mock.event).subscribe(
        (event) => expect(event).toEqual(mock.event)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/deleteParticipant/${mock.event.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.event);
    });

    it('should throw error', () => {
      service.leaveEvent(mock.event).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/deleteParticipant/${mock.event.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });
  describe('#acceptEvent', () => {

    it('should call http put method', () => {
      service.acceptEvent(mock.event).subscribe(
        (event) => expect(event).toEqual(mock.event)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/acceptEvent/${mock.event.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.event);
    });

    it('should throw error', () => {
      service.acceptEvent(mock.event).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/acceptEvent/${mock.event.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });
  describe('#declineEvent', () => {

    it('should call http put method', () => {
      service.declineEvent(mock.event).subscribe(
        (event) => expect(event).toEqual(mock.event)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/declineEvent/${mock.event.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.event);
    });

    it('should throw error', () => {
      service.declineEvent(mock.event).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}events/declineEvent/${mock.event.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });
  describe('#findUsersCollisions', () => {
    it('should return observable events', () => {
      sessionStorage.setItem('mean-token', 'token');

      service.findCollisions(mock.user, mock.date).subscribe( events => {
        expect(events.length).toBe(1);
        expect(events).toEqual([mock.event]);
      });

      const http = httpMock.expectOne(
        `${environment.APIEndpoint}events/collisions?with=${mock.user.id}&from=${mock.date.from.toISOString()}&to=${mock.date.to.toISOString()}`
      );
      expect(http.request.method).toBe('GET');
      http.flush([mock.event]);
    });

    describe('#getEventInvites', () => {
      it('should return observable events', () => {
        sessionStorage.setItem('mean-token', 'token');

        service.getEventInvites(mock.user.id).subscribe( events => {
          expect(events.length).toBe(1);
          expect(events).toEqual([mock.event]);
        });

        const http = httpMock.expectOne(
          `${environment.APIEndpoint}events/invites?userId=${mock.user.id}`
        );
        expect(http.request.method).toBe('GET');
        http.flush([mock.event]);
      });

      it('should throw error', () => {
        service.getEventInvites(mock.user.id).subscribe(
          () => {},
          (error) => expect(error.error.type).toBe('ERROR')
        );
        const http = httpMock.expectOne(`${environment.APIEndpoint}events/invites?userId=${mock.user.id}`);
        http.error(new ErrorEvent('ERROR'));
      });
    });

    describe('#getEvents', () => {
      it('should return observable events', () => {
        sessionStorage.setItem('mean-token', 'token');

        service.getEvents(mock.date, mock.user.id).subscribe( events => {
          expect(events.length).toBe(1);
          expect(events).toEqual([mock.event]);
        });

        const http = httpMock.expectOne(
          `${environment.APIEndpoint}events?from=${mock.date.from.toISOString()}&to=${mock.date.to.toISOString()}&userId=${mock.user.id}`
        );
        expect(http.request.method).toBe('GET');
        http.flush([mock.event]);
      });

      it('should throw error', () => {
        service.getEvents(mock.date, mock.user.id).subscribe(
          () => {},
          (error) => expect(error.error.type).toBe('ERROR')
        );
        const http = httpMock.expectOne(
          `${environment.APIEndpoint}events?from=${mock.date.from.toISOString()}&to=${mock.date.to.toISOString()}&userId=${mock.user.id}`
        );
        http.error(new ErrorEvent('ERROR'));
      });
    });
  });
});
 */