import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}
  save(product: Product): Observable<any>{
    return this.httpClient.post<Product>(`http://localhost:8080/products/create`, product)
  }
  findProduct(id: number): Observable<Product>{
    return  this.httpClient.get<Product>(`http://localhost:8080/products/${id}`)
  }
  update(product: Product, id: number): Observable<any>{
    return this.httpClient.put<Product>(`http://localhost:8080/products/${id}`, product)
  }
  findAll(){
    return this.httpClient.get<Product[]>(`http://localhost:8080/products`)
  }
  findAllByCategoriesId(id : number){
    return this.httpClient.get<Product[]>(`http://localhost:8080/admin/products/${id}`)
  }
  findAllByName(name: string){
    return this.httpClient.get<Product[]>(`http://localhost:8080/products/search/${name}`)
  }


}
