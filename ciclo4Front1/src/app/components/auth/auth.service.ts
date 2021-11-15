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
  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken!: string;
  admin: boolean = false;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

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

  storeUserCredentials(credentials: any) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
    this.sendAdmin(credentials.admin);
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  sendAdmin(admin: boolean) {
    this.admin = admin;
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

  isAdmin(): boolean {
    return this.admin;
  }
}
