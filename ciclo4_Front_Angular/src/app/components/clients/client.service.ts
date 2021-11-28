import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';
import { Client } from 'src/app/shared/client';

import {
  FormBuilder,
  FormGroup,
  MinValidator,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {
    this.createForm();
  }

  createForm() {
    this.clientForm = this.fb.group({
      _id: [''],
      cedula_cliente: ['', [Validators.required]],
      nombre_cliente: ['', [Validators.required]],
      email_cliente: ['', [Validators.required]],
      telefono_cliente: ['', [Validators.required]],
      direccion_cliente: ['', [Validators.required]],
    });
    this.clientForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.clientForm) {
      return;
    }
  }

  populateForm(employee) {
    this.clientForm.setValue(employee);
  }

  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>('http://localhost:3000/clients')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteClient(id) {
    console.log('Delete', id);
  };
}
