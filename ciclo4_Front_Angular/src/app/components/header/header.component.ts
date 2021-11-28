import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '../sales/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isLogged: boolean = false;
  username: string | undefined = undefined;
  subscription!: Subscription;
  cartSize!: number;

  private destroy$ = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private authSvc: AuthService,
    private cartSvd: CartService
  ) {}

  openLoginForm() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '250px',
    });
  }

  logOut(): void {
    this.authSvc.logout();
  }

  ngOnInit(): void {
    this.authSvc.loadUserCredentials();
    this.authSvc.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.username = user?.username;
      this.isLogged = user?.success ? true : false;
    });
    this.cartSvd.quantityAction$.subscribe((size) => (this.cartSize = size));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
