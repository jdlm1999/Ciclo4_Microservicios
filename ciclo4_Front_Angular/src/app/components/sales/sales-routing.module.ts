import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardShopingComponent } from './card-shoping/card-shoping.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  { path: '', component: SalesComponent },
  { path: 'card', component: CardShopingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
