import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/shared/producto';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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
      (res) => console.log(res),
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

  ngOnInit() {
    this.productoService.getProducts().subscribe(
      (products) => (this.products = products),
      (errMess) => ((this.errMess = errMess), console.log('error: ', errMess))
    );
  }
}
