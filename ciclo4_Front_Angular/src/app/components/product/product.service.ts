import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/producto';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { baseUrlProduct } from 'src/app/shared/baseURL';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(baseUrlProduct + 'product')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  uploadProduct(form): Observable<any> {
    console.log('form: ', form);
    return this.http.post(baseUrlProduct + 'upload', form);
  }
}
