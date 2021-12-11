import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/shared/sale';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  salesBogota: Array<Sale> = [];
  salesMedallo: Array<Sale> = [];
  displayedColumns: string[] = ['Ciudad', 'Total Ventas'];
  bogota: number = 0;
  medallo: number = 0;
  total: number = 0;
  constructor(private saleCvs: SalesService) {}

  getSaleBogota() {
    this.saleCvs.getSalesBogota().subscribe(
      (list) => {
        let array = list.map((sale) => {
          return { ...sale };
        });
        this.salesBogota = array;
        console.log(this.salesBogota);
      },
      (error) => {}
    );
  }

  getSaleMedallo() {
    this.saleCvs.getSalesMedallo().subscribe(
      (list) => {
        let array = list.map((sale) => {
          return { ...sale };
        });
        this.salesMedallo = array;
        console.log(this.salesMedallo);
        this.crearTabla();
      },
      (error) => {}
    );
  }

  crearTabla() {
    let bogota = 0;
    let medallo = 0;

    this.salesBogota.forEach((bog) => {
      bogota += bog.valor_venta;
    });
    this.salesMedallo.forEach((med) => {
      medallo += med.valor_venta;
    });

    this.bogota = bogota;
    this.medallo = medallo;
    this.total = this.bogota + this.medallo;

    console.log(bogota);
    console.log(medallo);
  }

  ngOnInit(): void {
    this.getSaleBogota();
    this.getSaleMedallo();
  }
}
