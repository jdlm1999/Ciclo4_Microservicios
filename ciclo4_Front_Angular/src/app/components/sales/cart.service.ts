import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/producto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private quantitySubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  private ivaSubject = new BehaviorSubject<number>(0);
  private quantityPlusIvaSubject = new BehaviorSubject<number>(0);

  constructor() {}

  updateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotalWIva();
    this.calcIva();
    this.calcTotal();
  }

  deleteProductCart(id) {
    this.products.splice(id, 1);
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotalWIva();
    this.calcIva();
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
    this.calcTotalWIva();
    this.calcIva();
    this.calcTotal();
  }

  decrease(codigo) {
    this.products.map((product) => {
      if (product.codigo_producto === codigo) {
        if (product.qty === 0) product.qty;
        else product.qty -= 1;
      }
      return product;
    });
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotalWIva();
    this.calcIva();
    this.calcTotal();
  }

  cancelSale() {
    this.products = [];
    this.cartSubject.next(this.products);
    this.quantityProducts();
    this.calcTotalWIva();
    this.calcIva();
    this.calcTotal();
  }

  get totalWIvaAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }
  get totalIva$(): Observable<number> {
    return this.ivaSubject.asObservable();
  }
  get totalPIva$(): Observable<number> {
    return this.quantityPlusIvaSubject.asObservable();
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

  private calcTotalWIva(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.precio_venta * prod.qty),
      0
    );
    this.totalSubject.next(total);
  }

  private calcIva(): void {
    const iva = this.products.reduce(
      (acc, prod) =>
        (acc += (prod.iva_compra / 100) * prod.precio_venta * prod.qty),
      0
    );
    this.ivaSubject.next(Math.round(iva));
  }

  private calcTotal(): void {
    const total = this.totalSubject.value + this.ivaSubject.value;
    this.quantityPlusIvaSubject.next(total);
  }
}
