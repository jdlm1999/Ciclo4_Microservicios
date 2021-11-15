import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    this.authService.logIn(this.user).subscribe(
      (user) => {
        if (user.success) {
          this.dialogRef.close(user.success);
          Swal.fire({
            icon: 'success',
            title: 'Credeciales correctas, Bienvenido!!!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log('component:', user);
        }
      },
      (error) => {
        console.log(error);
        this.errMess = error;
        Swal.fire({
          icon: 'error',
          title: 'Oops... Credenciales Incorrectas!',
          text: 'Intenta de nuevo.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }
}
