import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken!: string;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  storeUserCredentials(credentials: any) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }

  checkJWTtoken() {
    console.log('checkJWTtoken');
    this.sendUsername('change');
    console.log('getJWT', this.getUsername());
    // this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
    // .subscribe(res => {
    //   console.log('JWT Token Valid: ', res);
    //   this.sendUsername(res.user.username);
    // },
    // err => {
    //   console.log('JWT Token invalid: ', err);
    //   this.destroyUserCredentials();
    // });
  }

  logIn(user: any): Observable<any> {
    return this.http
      .post<AuthResponse>('http://localhost:8081/users/login', {
        username: user.username,
        password: user.password,
      })
      .pipe(
        map((res) => {
          console.log('res:', res);
          console.log('token:', JSON.parse(atob(res.token.split('.')[1])));
          this.storeUserCredentials({
            username: user.username,
            token: res.token,
            admin: JSON.parse(atob(res.token.split('.')[1])),
          });
          return { success: true, username: user.username };
        }),
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  destroyUserCredentials() {
    this.authToken = '';
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }
}
