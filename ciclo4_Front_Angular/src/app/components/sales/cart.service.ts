import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/producto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  constructor() {}

  updateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  deleteProductCart(id) {
    this.products.splice(id, 1);
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotal();
  }

  increase(codigo) {
    this.products.map((product) => {
      if (product.codigo_producto === codigo) {
        product.qty += 1;
      }
      return product;
    });
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotal();
  }

  decrease(codigo) {
    this.products.map((product) => {
      if (product.codigo_producto === codigo) {
        product.qty -= 1;
      }
      return product;
    });
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotal();
  }

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  private addToCart(product: Product): void {
    const isProductInCart = this.products.find(
      ({ codigo_producto }) => codigo_producto === product.codigo_producto
    );

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
    }
    this.cartSubject.next(this.products);
  }

  private quantityProducts(): void {
    const quantity = this.products.reduce((acc, prod) => (acc += prod.qty), 0);
    this.quantitySubject.next(quantity);
  }

  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.precio_venta * prod.qty),
      0
    );
    this.totalSubject.next(total);
  }
}
