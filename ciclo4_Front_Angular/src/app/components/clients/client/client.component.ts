import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../client.service';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  MinValidator,
  Validators,
} from '@angular/forms';
import { Client } from 'src/app/shared/client';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client!: Client | null;
  clientForm!: FormGroup;
  errMess!: string;
  @ViewChild('cform') commentFormDirective!: NgForm;

  constructor(
    private clientSvc: ClientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientComponent>
  ) {
    this.clientForm = this.clientSvc.clientForm;
  }

  onSubmit() {
    if (this.clientSvc.clientForm.valid) {
      console.log(this.clientSvc.clientForm.value);
    }
  }

  onClose() {
    this.commentFormDirective.resetForm();
    this.clientForm.reset();
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
