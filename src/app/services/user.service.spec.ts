/* import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../domain/User';
import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import * as mock from '../../testing/mock';


describe('UserService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [UserService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });
  beforeEach(inject([UserService], s => {
    service = s;
  }));

  beforeEach(() => {
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('authorization', () => {

    it('should return mock user token and add token in service', () => {
      sessionStorage.clear();
      service.authorization('123', '123').subscribe(
        token => expect(token).toEqual(mock.token),
        fail
      );
      expect(service.getToken()).toEqual(null);
      const req = httpTestingController.expectOne(service.REST_URI_LOGIN);
      expect(req.request.method).toEqual('POST');
      req.flush(mock.token);
    });

  it('should take null token', () => {
    sessionStorage.clear();
    service.authorization('123', '123').subscribe(
      token => expect(token).toEqual(mock.mockTokenNull),
      fail
    );
    expect(service.getToken()).toEqual(null);
    const req = httpTestingController.expectOne(service.REST_URI_LOGIN);
    expect(req.request.method).toEqual('POST');
    req.flush(mock.mockTokenNull);
  });

  it('should tale null require', () => {
    sessionStorage.clear();
    service.authorization('123', '123').subscribe(
      token => expect(token).toEqual(mock.mockDataNull),
      fail
    );
    expect(service.getToken()).toEqual(null);
    const req = httpTestingController.expectOne(service.REST_URI_LOGIN);
    expect(req.request.method).toEqual('POST');
    req.flush(mock.mockDataNull);
  });
  });
  describe('addNewUser', () => {
    it('should return mock user token and add token in service', () => {

      sessionStorage.clear();
      service.addNewUser(mock.user).subscribe(
        token => expect(token).toEqual(mock.token),
        fail
      );
      expect(service.getToken()).toEqual(null);
      const req = httpTestingController.expectOne(service.REST_URI_SIGN);
      expect(req.request.method).toEqual('POST');
      req.flush(mock.token);
    });

    it('should take null token', () => {
      sessionStorage.clear();
      service.addNewUser(mock.user).subscribe(
        token => expect(token).toEqual(mock.mockTokenNull),
        fail
      );
      expect(service.getToken()).toEqual(null);
      const req = httpTestingController.expectOne(service.REST_URI_SIGN);
      expect(req.request.method).toEqual('POST');
      req.flush(mock.mockTokenNull);
    });

    it('should tale null require', () => {
      sessionStorage.clear();
      service.addNewUser(mock.user).subscribe(
        token => expect(token).toEqual(mock.mockDataNull),
        fail
      );
      expect(service.getToken()).toEqual(null);
      const req = httpTestingController.expectOne(service.REST_URI_SIGN);
      expect(req.request.method).toEqual('POST');
      req.flush(mock.mockDataNull);
    });
  });
  describe('getProfile', () => {

    it('should return user profile', () => {
      service.saveToken('111111111111111111111111111111111111111111111111');
      service.getProfile().subscribe(
        user => expect(user).toEqual(mock.token),
        fail
      );
      const req = httpTestingController.expectOne(service.REST_URI_PROFILE);
      expect(req.request.method).toEqual('GET');
      req.flush(mock.token);
    });
  });
  describe('search', () => {
  const query = 'qwerty';
  const mockUser = [new User ('', '' ,  '', '', '')];
    it('should return user profile', () => {
      service.searchUser(query).subscribe(
        user => expect(user).toEqual([mock.user]),
        fail
      );
      const req = httpTestingController.expectOne(`${service.REST_URI}/search?query=${query}`);
      expect(req.request.method).toEqual('GET');
      req.flush([mock.user]);
    });
  });
    it('should save token', () => {
      service.saveToken('111111111111111111111111111111111111111111111111');
     expect(sessionStorage.getItem('mean-token')).toEqual('111111111111111111111111111111111111111111111111');
    });
});
 */