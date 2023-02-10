import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  findAllByStore(storeId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/products`)
  }
}
