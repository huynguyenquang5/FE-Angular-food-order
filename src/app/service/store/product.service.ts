import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product/product";
import {environment} from "../../../environments/environment";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  findAllByStore(storeId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}/products/store/${storeId}`)  }
  findAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}/products`)
  }
}
