import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MaterialModule } from 'src/app/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    ClientListComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    SweetAlert2Module,
    FlexLayoutModule
  ]
})
export class ClientsModule { }
