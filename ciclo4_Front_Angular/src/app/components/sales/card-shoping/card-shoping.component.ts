import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/producto';
import { ClientService } from '../../clients/client.service';
import { CartService } from '../cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-card-shoping',
  templateUrl: './card-shoping.component.html',
  styleUrls: ['./card-shoping.component.css'],
})
export class CardShopingComponent implements OnInit {
  cart: Product[] = [];

  listData!: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'codigo_producto',
    'nombre_producto',
    'qty',
    'valor_total',
    'actions',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  total$ = this.cartSvs.totalAction$;

  constructor(private cartSvs: CartService, private clientSvc: ClientService) {}

  private getDataCart(): void {
    this.cartSvs.cartAction$.subscribe((products) => {
      let array = products.map((product) => {
        return { ...product };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onDeleteCart(id) {
    this.cartSvs.deleteProductCart(id);
  }

  decrease(id) {
    console.log(id);
    this.cartSvs.decrease(id);
  }
  
  increase(id) {
    console.log(id);
    this.cartSvs.increase(id);
  }

  ngOnInit(): void {
    this.getDataCart();
  }
}
