import { Component, OnInit, ViewChild } from '@angular/core';
import { Sale } from 'src/app/shared/sale';
import { ClientService } from '../../clients/client.service';
import { CartService } from '../cart.service';
import { SalesService } from '../sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from 'src/app/shared/client';

interface Table {
  cedula_cliente: number;
  nombre_cliente: string;
  valor_total: number;
}

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})
export class SalesListComponent implements OnInit {
  listData!: MatTableDataSource<Sale>;
  clientSalesShow!: any[];
  sales: Array<Sale> = [];
  clients: Array<Client> = [];
  saleClient = new Map();
  salesTable: boolean = false;
  clientTable: boolean = false;
  displayedColumns: string[] = [
    'codigo_venta',
    'cedula_cliente',
    'cedula_usuario',
    'iva_venta',
    'total_venta',
    'valor_venta',
  ];
  displayedColumnsClientsSales: string[] = [
    'cedula_mostrar',
    'nombre_mostrar',
    'valor_mostrar',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cartSvs: CartService,
    private clientSvc: ClientService,
    private saleCvs: SalesService
  ) {}

  getSalesAndClients() {
    this.clientSvc.getClients().subscribe(
      (list) => {
        let clientes = list.map((client) => {
          return { ...client };
        });
        this.clients = clientes;
      },
      (error) => {
        console.log(error);
      }
    );
    this.saleCvs.getSalesBogota().subscribe(
      (list) => {
        let array = list.map((item) => {
          return { ...item };
        });
        this.listData = new MatTableDataSource(array);
        this.sales = array;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.salesEachClient();
      },
      (error) => console.log(error)
    );
  }

  salesEachClient() {
    this.sales.forEach((sale) => {
      if (this.saleClient.has(sale.cedula_cliente)) {
        let price = this.saleClient.get(sale.cedula_cliente);
        price += sale.valor_venta;
        this.saleClient.set(sale.cedula_cliente, price);
      } else {
        this.saleClient.set(sale.cedula_cliente, sale.valor_venta);
      }
    });
    console.log(this.saleClient.keys());
    this.createTableEachClient();
  }

  createTableEachClient() {
    console.log('List', this.clients);
    let array: any[] = [];
    this.clients.forEach((client) => {
      array.push({
        cedula_mostrar: client.cedula_cliente,
        nombre_mostrar: client.nombre_cliente,
        valor_mostrar:
          this.saleClient.get(client.cedula_cliente) > 0
            ? this.saleClient.get(client.cedula_cliente)
            : 0,
      });
    });
    this.clientSalesShow = array;
  }

  showSalesTable() {
    this.salesTable = true;
    this.clientTable = false;
  }

  showClientTable() {
    this.salesTable = false;
    this.clientTable = true;
  }

  ngOnInit(): void {
    this.getSalesAndClients();
  }
}
