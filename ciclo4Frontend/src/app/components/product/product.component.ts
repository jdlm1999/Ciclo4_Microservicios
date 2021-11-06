import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  constructor(private proService: ProductService) {}

  @Input()
  products!: Product[];

  getProducts(): void {
    this.proService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
