import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/producto';
import { ClientService } from '../../clients/client.service';
import { CartService } from '../cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from 'src/app/shared/client';
import { SalesService } from '../sales.service';
import { Sale } from 'src/app/shared/sale';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-shoping',
  templateUrl: './card-shoping.component.html',
  styleUrls: ['./card-shoping.component.css'],
})
export class CardShopingComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo_producto',
    'nombre_producto',
    'qty',
    'valor_total',
    'actions',
  ];
  listData!: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  totalWIva$ = this.cartSvs.totalWIvaAction$;
  totalIva$ = this.cartSvs.totalIva$;
  totalPIva$ = this.cartSvs.totalPIva$;
  client!: Client;
  sale!: Sale;
  cedCliente!: string;

  constructor(
    private cartSvs: CartService,
    private clientSvc: ClientService,
    private saleCvs: SalesService
  ) {}

  private getDataCart(): void {
    this.cartSvs.cartAction$.subscribe((list) => {
      let array = list.map((item) => {
        return {
          ...item,
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return (
            ele != 'actions' &&
            data[ele].toString().toLowerCase().indexOf(filter) != -1
          );
        });
      };
    });
  }

  onDeleteCart(id) {
    this.cartSvs.deleteProductCart(id);
  }

  decrease(id) {
    this.cartSvs.decrease(id);
  }

  increase(id) {
    this.cartSvs.increase(id);
  }

  cancelarVenta() {
    this.cartSvs.cancelSale();
  }

  confirmSale() {
    let total = 0;
    let iva = 0;
    let totalPIva = 0;
    this.totalWIva$.subscribe((totalWI) => (total = totalWI));
    this.totalIva$.subscribe((totalWI) => (iva = totalWI));
    this.totalPIva$.subscribe((totalWI) => (totalPIva = totalWI));
    console.log(this.client);
    const sale: Sale = {
      codigo_venta: 1,
      cedula_usuario: this.client.cedula_cliente,
      cedula_cliente: this.client.cedula_cliente,
      valor_venta: total,
      iva_venta: iva,
      total_venta: totalPIva,
    };
    this.saleCvs.postSale(sale).subscribe(
      (sale) => {
        console.log(sale);
        Swal.fire({
          icon: 'success',
          title: `Se ha creado la venta.`,
          text: 'Creado con exito!',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      (error) => console.log(error)
    );
  }

  getClientCed() {
    this.clientSvc.getClient(this.cedCliente).subscribe(
      (client) => (this.client = client[0]),
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {
    this.getDataCart();
  }
}
