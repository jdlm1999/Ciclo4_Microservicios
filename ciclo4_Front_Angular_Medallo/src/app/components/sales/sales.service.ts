import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from 'src/app/services/process-httpmsg.service';
import { Sale } from 'src/app/shared/sale';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  postSale(sale): Observable<Sale>{
    console.log(sale);
    return this.http
      .post<Sale>('http://localhost:3001/sales', sale)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getSales(): Observable<any> {
    return this.http
      .get<any>('http://localhost:3001/sales')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
