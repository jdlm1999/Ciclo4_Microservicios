import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardShopingComponent } from './card-shoping/card-shoping.component';
import { ReportsComponent } from './reports/reports.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'card', component: CardShopingComponent },
  { path: 'report', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
