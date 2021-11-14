import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false };
  errMess!: string;

  constructor(
    public authService: AuthService,
    public processHttpMsgService: ProcessHttpmsgService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('User: ', this.user)
    this.dialogRef.close();
  }
}
