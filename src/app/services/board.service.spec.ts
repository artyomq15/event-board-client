/* import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';

import * as mock from '../../testing/mock';
import {BoardService} from './board.service';

describe('Board Service', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService],
    });

    service = TestBed.get(BoardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getAll', () => {

    it('should return empty array when no token', () => {
      sessionStorage.removeItem('mean-token');
      const userId = sessionStorage.getItem('_id');

      service.getAll(userId).subscribe( boards => {
        expect(boards.length).toBe(0);
      });
    });

    it('should return observable boards', () => {
      sessionStorage.setItem('mean-token', 'token');
      const userId = sessionStorage.getItem('_id');

      service.getAll(userId).subscribe( boards => {
        expect(boards.length).toBe(1);
        expect(boards).toEqual([mock.board]);
      });

      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards?userId=${userId}`);
      expect(http.request.method).toBe('GET');
      http.flush([mock.board]);
    });

    it('should throw error', () => {
      sessionStorage.setItem('mean-token', 'token');
      const userId = sessionStorage.getItem('_id');

      service.getAll(userId).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards?userId=${userId}`);
      http.error(new ErrorEvent('ERROR'));

    });
  });

  describe('#getBoardInvites', () => {

    it('should return empty array when no token', () => {
      sessionStorage.removeItem('mean-token');
      const userId = sessionStorage.getItem('_id');

      service.getBoardInvites(userId).subscribe( boards => {
        expect(boards.length).toBe(0);
      });
    });

    it('should return observable boards', () => {
      sessionStorage.setItem('mean-token', 'token');
      const userId = sessionStorage.getItem('_id');

      service.getBoardInvites(userId).subscribe( boards => {
        expect(boards.length).toBe(1);
        expect(boards).toEqual([mock.board]);
      });

      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/invites?userId=${userId}`);
      expect(http.request.method).toBe('GET');
      http.flush([mock.board]);
    });

    it('should throw error', () => {
      sessionStorage.setItem('mean-token', 'token');
      const userId = sessionStorage.getItem('_id');

      service.getBoardInvites(userId).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/invites?userId=${userId}`);
      http.error(new ErrorEvent('ERROR'));

    });
  });
  describe('#get', () => {

    it('should return empty array when no token', () => {
      sessionStorage.removeItem('mean-token');

      service.get('1').subscribe( board => {
        expect(board).toEqual(null);
      });
    });

    it('should return observable board', () => {
      sessionStorage.setItem('mean-token', 'token');

      service.get('1').subscribe( board => {
        expect(board).toEqual(mock.board);
      });

      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/${mock.board.id}`);
      expect(http.request.method).toBe('GET');
      http.flush(mock.board);
    });

    it('should throw error', () => {
      sessionStorage.setItem('mean-token', 'token');
      service.get('1').subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/${mock.board.id}`);
      http.error(new ErrorEvent('ERROR'));

    });
  });
  describe('#add', () => {

    it('should call http post method', () => {
      service.add(mock.board).subscribe();

      const http = httpMock.expectOne(`${environment.APIEndpoint}boards`);
      expect(http.request.method).toBe('POST');
      expect(http.request.body).toEqual(mock.board);
    });

    it('should throw error', () => {
      service.add(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards`);
      http.error(new ErrorEvent('ERROR'));
    });

  });
  describe('#edit', () => {

    it('should call http put method', () => {
      service.edit(mock.board).subscribe(
        (board) => expect(board).toEqual(mock.board)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.board);
    });

    it('should throw error', () => {
      service.edit(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards`);
      http.error(new ErrorEvent('ERROR'));
    });

  });
  describe('#accept', () => {

    it('should call http put method', () => {
      service.accept(mock.board).subscribe(
        (board) => expect(board).toEqual(mock.board)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/accepting/${mock.board.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.board);
    });

    it('should throw error', () => {
      service.accept(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/accepting/${mock.board.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });
  describe('#decline', () => {

    it('should call http put method', () => {
      service.decline(mock.board).subscribe(
        (board) => expect(board).toEqual(mock.board)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/declining/${mock.board.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.board);
    });

    it('should throw error', () => {
      service.decline(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/declining/${mock.event.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });

  describe('#getEvents', () => {

    it('should return empty array when no token', () => {
      sessionStorage.removeItem('mean-token');

      service.getEvents(mock.date, '1').subscribe( events => {
        expect(events.length).toBe(0);
      });
    });

    it('should return observable events', () => {
      sessionStorage.setItem('mean-token', 'token');

      service.getEvents(mock.date, '1').subscribe( events => {
        expect(events.length).toBe(1);
        expect(events).toEqual([mock.event]);
      });

      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/${mock.board.id}/events?from=${mock.date.from.toISOString()}&to=${mock.date.to.toISOString()}`
      );
      expect(http.request.method).toBe('GET');
      http.flush([mock.event]);
    });

    it('should throw error', () => {
      sessionStorage.setItem('mean-token', 'token');
      service.getEvents(mock.date, '1').subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(
        `${environment.APIEndpoint}boards/${mock.board.id}/events?from=${mock.date.from.toISOString()}&to=${mock.date.to.toISOString()}`
      );
      http.error(new ErrorEvent('ERROR'));

    });
  });

  describe('#leave', () => {

    it('should call http put method', () => {
      service.leave(mock.board).subscribe(
        (event) => expect(event).toEqual(mock.board)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/leaving/${mock.board.id}`);
      expect(http.request.method).toBe('PUT');
      expect(http.request.body).toEqual(mock.board);
    });

    it('should throw error', () => {
      service.leave(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/leaving/${mock.board.id}`);
      http.error(new ErrorEvent('ERROR'));
    });
  });
  describe('#delete', () => {

    it('should call http delete method', () => {
      service.delete(mock.board).subscribe(
        (board) => expect(board).toEqual(mock.board)
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/${mock.board.id}`);
      expect(http.request.method).toBe('DELETE');
    });

    it('should throw error', () => {
      service.delete(mock.board).subscribe(
        () => {},
        (error) => expect(error.error.type).toBe('ERROR')
      );
      const http = httpMock.expectOne(`${environment.APIEndpoint}boards/${mock.board.id}`);
      http.error(new ErrorEvent('ERROR'));
    });

  });
});
 */