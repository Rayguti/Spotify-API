import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  private tokenUrl: string = "https://accounts.spotify.com/api/token";
  private encodedCredentials: string = btoa(environment.spotify.clientId + ":" + environment.spotify.clientSecret);
  private token: string = '';

  private body = 'grant_type=client_credentials';
  private options = {
    headers: new HttpHeaders({
      'Authorization': 'Basic '.concat(this.encodedCredentials),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  constructor(private httpClient: HttpClient){
    this.token = this.loadToken();
  }

  getAccessToken(): string{
    return this.token;
  }

  getAccessToken_(): string {
    this.refreshAccessToken()
      .subscribe(token => { 
        this.token = token?token:'';
        localStorage.setItem('token', this.token );
       });

    return this.token;
  }

  refreshAccessToken(): Observable<string | null> {
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url, this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(() => of(null))
      )
  } 

  public handleAuthError<T>(retryCallback: () => Observable<T>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) =>
      source.pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 400) {
            console.log(error);
            return this.refreshAccessToken().pipe(
              tap(token => {
                this.token = token || '';
                localStorage.setItem('token', this.token);
              }),
              switchMap(retryCallback)
            );
          }
          return throwError(() => error);
        })
      );
  }

  private loadToken(): string {
    return localStorage.getItem('token') || '';
  }

  login(username: string, password: string): boolean { 
    if ((username === '' && password === '') || (username === 'Raul' && password === '123')) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
