import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductMethod} from "../../model/product/product-method";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductMethodService {

  constructor(private httpClient: HttpClient) { }
  save(productMethod: ProductMethod): Observable<any>{
    return this.httpClient.post(`http://localhost:8080/productMethods/create`,productMethod)
  }
}
