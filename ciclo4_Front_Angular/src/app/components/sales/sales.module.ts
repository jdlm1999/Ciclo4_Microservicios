import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { CardShopingComponent } from './card-shoping/card-shoping.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    SalesComponent,
    CardShopingComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SalesModule { }
