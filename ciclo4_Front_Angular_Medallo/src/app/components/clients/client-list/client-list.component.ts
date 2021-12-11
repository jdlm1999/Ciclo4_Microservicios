import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/shared/client';
import { ClientService } from '../client.service';
import { ClientComponent } from '../client/client.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = [
    'cedula_cliente',
    'nombre_cliente',
    'correo_cliente',
    'telefono_cliente',
    'direccion_cliente',
    'actions',
  ];
  listData!: MatTableDataSource<Client>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  constructor(public dialog: MatDialog, private clientSvc: ClientService) {}

  openClientForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    this.dialog.open(ClientComponent, dialogConfig);
  }

  onEdit(row) {
    this.clientSvc.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    this.dialog.open(ClientComponent, dialogConfig);
  }

  onDelete(cedula) {
    Swal.fire({
      title: `Estas seguro que deseas eliminar el cliente con cedula: ${cedula}`,
      text: 'No podras recuperar esta informacion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      confirmButtonColor: '#36FF33',
      cancelButtonText: 'No, cancelar.',
      cancelButtonColor: '#C70039',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientSvc.deleteClient(cedula).subscribe(
          (data) => console.log(data),
          (error) => console.log(error)
        );
        Swal.fire({
          icon: 'success',
          title: `Se ha eliminado el cliente con cedula ${cedula}`,
          text: 'Eliminado con exito!',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          // RouterState.reload();
          window.location.reload();
        }, 2000);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Cancelado',
          text: 'No se ha eliminado el cliente :)',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    if (this.searchKey !== '' || this.searchKey !== undefined) {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }
  }

  private getClients(): void {
    this.clientSvc.getClients().subscribe((list) => {
      let array = list.map((item) => {
        return { ...item };
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

  ngOnInit(): void {
    this.getClients();
  }
}
