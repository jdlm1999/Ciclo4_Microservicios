import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken!: string;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  logIn(user: any) {
    return (
      this.http.post('', {}),
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
  }

  sendUsername(name: string) {
    this.username.next(name);
  }
}
