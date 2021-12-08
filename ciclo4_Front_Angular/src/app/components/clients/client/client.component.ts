import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../client.service';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  MinValidator,
  Validators,
} from '@angular/forms';
import { Client, ClientPost } from 'src/app/shared/client';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client!: ClientPost | null;
  clientForm!: FormGroup;
  errMess!: string;
  @ViewChild('cform') commentFormDirective!: NgForm;

  constructor(
    private clientSvc: ClientService,
    public dialogRef: MatDialogRef<ClientComponent>
  ) {
    this.clientForm = this.clientSvc.clientForm;
  }

  onSubmit() {
    if (this.clientSvc.clientForm.valid) {
      const {
        _id,
        cedula_cliente,
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
      } = this.clientForm.value;
      this.client = {
        cedula_cliente: cedula_cliente,
        nombre_cliente: nombre_cliente,
        correo_cliente: correo_cliente,
        telefono_cliente: telefono_cliente,
        direccion_cliente: direccion_cliente,
      };
      if (_id !== '') {
        this.clientSvc.updateClient(this.client, _id).subscribe(
          (data) => {
            console.log('Data', data), this.onClose();
            Swal.fire({
              icon: 'success',
              title: `Se ha Modificado el cliente con cedula ${data.cedula_cliente}`,
              text: 'Creado con exito!',
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              // RouterState.reload();
              window.location.reload();
            }, 2000);
          },
          (errMess) => (
            (this.errMess = errMess), console.log('error: ', errMess)
          )
        );
      } else {
        this.clientSvc.postClient(this.client).subscribe(
          (data) => {
            console.log('Data', data), this.onClose();
            Swal.fire({
              icon: 'success',
              title: `Se ha creado el cliente`,
              text: 'Creado con exito!',
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              // RouterState.reload();
              window.location.reload();
            }, 2000);
          },
          (errMess) => (
            (this.errMess = errMess), console.log('error: ', errMess)
          )
        );
      }
    }
  }

  onClose() {
    this.commentFormDirective.resetForm();
    this.clientForm.reset();
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
