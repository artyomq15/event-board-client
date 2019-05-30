/* import { Injectable } from '@angular/core';
import { User } from '../domain/User';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import * as UserDeserializer from '../utils/userDeserializer';


interface TokenResponse {
  token: string;
}

@Injectable()
export class UserService {

  public REST_URI_SIGN = environment.APIEndpoint + 'register';
  public REST_URI_LOGIN = environment.APIEndpoint + 'login';
  public REST_URI = environment.APIEndpoint + 'user';
  public REST_URI_PROFILE = environment.APIEndpoint + 'profile';

  private token: string;
  public request;

  constructor(private http: HttpClient) {}

    public addNewUser(newUser: User): Observable<boolean>  {
    let user;
    user = this.http.post(this.REST_URI_SIGN, newUser);
      this.request = user.pipe(
        map((data: TokenResponse) => {
          if (data) {
            if (data.token) {
              this.saveToken(data.token);
            } else {
              this.saveToken(null);
            }
            return data;
          } else {
            return null;
          }
          })
        );
      return this.request ;
    }
  public searchUser(query: string): Observable<User[]> {
    query = query.trim().toLowerCase();

    if (!query) {
      return of([]);
    }

    return this.http.get(
      `${this.REST_URI}/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('mean-token')}`
        }
      })
      .pipe(
        map((users: User[]) => UserDeserializer.deserializeUsers(users)),
        catchError((error: Error) => throwError(error))
      );

  }

  public authorization(login: string, password: string): Observable<boolean> {
    const newUser = new User (' ', ' ', ' ', password, login);
    let user;
    user = this.http.post(this.REST_URI_LOGIN, newUser);
    const request = user.pipe(
      map((data: TokenResponse) => {
        if (data) {
          if (data.token) {
            this.saveToken(data.token);
          } else {
              this.saveToken(null);
          }
          return data;
        } else {
            return null;
       }
      })
    );
    return request;
  }

  private saveToken(token: string): void {
    sessionStorage.setItem('mean-token', token);
    this.token = token;
  }
  public getToken(): string {
    if (!this.token) {
      this.token = sessionStorage.getItem('mean-token');
    }
    return this.token;
  }
  public logout(): Observable<User> {
    this.token = '';
    window.sessionStorage.removeItem('mean-token');
    return of(null);
  }
  public getProfile(): Observable<User> {
    return this.http.get(this.REST_URI_PROFILE, { headers: { Authorization: `Bearer ${this.getToken()}` }})
      .pipe(
      map((users: User) => UserDeserializer.deserializeUser(users)),
      catchError((error: Error) => throwError(error))
    );
  }
}
 */