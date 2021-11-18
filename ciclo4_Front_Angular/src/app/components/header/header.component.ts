import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | undefined;
  subscription!: Subscription;
  authenticated: boolean = false;

  constructor(public dialog: MatDialog, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.loadUserCredentials();
    this.subscription = this.authSvc.getUsername().subscribe((user) => {
      (this.username = user),
        //   (this.authenticated = user.admin),
        console.log('user', user);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '250px',
    });
  }

  logOut() {
    this.username = undefined;
    this.authSvc.logOut();
  }
}
