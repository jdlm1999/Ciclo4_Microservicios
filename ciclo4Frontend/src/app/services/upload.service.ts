import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData) {
    let urlApi = 'http://localhost:8080/upload';
    return this.http.post(urlApi, formData);
  }
}
