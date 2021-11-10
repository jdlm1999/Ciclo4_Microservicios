import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private authClient = new OktaAuth({
    issuer: 'https://localhost:4200/oauth2/default',
    clientId: '{ClientId}',
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string): Promise<void> {
    // const transaction = await this.authClient.signIn({ username, password });

    // if (transaction.status !== 'SUCCESS') {
    //   throw Error('We cannot handle the ' + transaction.status + ' status');
    // }

    if(username === 'admin' && password === 'admin'){
      this.isAuthenticated.next(true);
    }

    // this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
    // this.authClient.session.setCookieAndRedirect('token');
  }

  async logout(redirect: string): Promise<void> {
    try {
      // await this.authClient.signOut();
      this.isAuthenticated.next(false);
      await this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
