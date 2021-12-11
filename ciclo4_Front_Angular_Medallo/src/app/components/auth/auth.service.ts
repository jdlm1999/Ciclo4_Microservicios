import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';

interface AuthResponse {
  success: boolean;
  username: string;
  token: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userKey: string = 'user';
  isAuthenticated: Boolean = false;
  private user = new BehaviorSubject<AuthResponse | null>(null);
  authToken!: string;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    private router: Router
  ) {}

  get user$(): Observable<AuthResponse | null> {
    return this.user.asObservable();
  }

  get userValue(): AuthResponse | null {
    return this.user.getValue();
  }

  saveLocalStorage(user: AuthResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  loadUserCredentials() {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
    console.log('loadUserCredentials ', user);
    if (user && user.username !== undefined) {
      this.user.next(user);
    }
  }

  logIn(user: any): Observable<any> {
    return this.http
      .post<AuthResponse>('http://localhost:3004/users/login', {
        username: user.username,
        password: user.password,
      })
      .pipe(
        map((res) => {
          console.log('res:', res);
          console.log('token:', JSON.parse(atob(res.token.split('.')[1])));
          const auth: AuthResponse = {
            success: res.success,
            username: JSON.parse(atob(res.token.split('.')[1])).username,
            token: res.token,
            admin: JSON.parse(atob(res.token.split('.')[1])).admin,
          };
          this.saveLocalStorage(auth);
          this.user.next(auth);
          return auth;
        }),
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  logout(): void {
    console.log('LogoutSVC');
    localStorage.removeItem(this.userKey);
    this.user.next(null);
    this.router.navigate(['/']);
  }
}
