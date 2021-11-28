import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/shared/producto';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartService } from '../../sales/cart.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  errMess!: string;
  showUpload: boolean = true;
  uploadFileForm!: FormGroup;

  constructor(
    private productoService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private cartSvs:CartService
  ) {
    this.createForm();
  }

  createForm() {
    this.uploadFileForm = this.fb.group({
      productFile: [],
    });
  }

  onSubmit() {
    console.log(this.uploadFileForm.value.productFile.files[0]);
    let formData = new FormData();
    formData.append(
      'productFile',
      this.uploadFileForm.value.productFile.files[0]
      // this.uploadFileForm.value.productFile
    );
    this.productoService.uploadProduct(formData).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Productos cargados con exito!',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          // RouterState.reload();
          window.location.reload();
        }, 2000);
      },
      (errmess) => {
        this.errMess = errmess;
        console.log(this.errMess);
      }
    );
    // this.uploadFileForm.resetForm();
    this.uploadFileForm.reset({
      productFile: [],
    });
    this.productoService.getProducts().subscribe(
      (products) => (this.products = products),
      (errMess) => ((this.errMess = errMess), console.log('error: ', errMess))
    );
  }

  addToCard(product) {
    console.log(product);
    this.cartSvs.updateCart(product);
    this.cartSvs.cartAction$
    .pipe(
      tap((products: Product[]) => console.log('Card Products', products))
    )
    .subscribe()
  }

  ngOnInit() {
    this.productoService.getProducts().subscribe(
      (products) => (this.products = products),
      (errMess) => ((this.errMess = errMess), console.log('error: ', errMess))
    );
  }
}
