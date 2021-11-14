import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username!: string;
  subscription!: Subscription;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openLoginForm() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '250px',
    });
  }
}
