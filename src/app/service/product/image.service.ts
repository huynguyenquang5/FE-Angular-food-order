import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../../model/product/image";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  save(image: Image): Observable<any>{
    return this.httpClient.post<Image>(`http://localhost:8080/images/create`, image)
  }
  create(image: Image): Observable<any>{
    return this.httpClient.post<Image>(`http://localhost:8080/images/add`, image)
  }
  findAllByProduct(productId: number):Observable<Image[]>{
    return this.httpClient.get<Image[]>(`http://localhost:8080/images/product/${productId}`);
  }
  update(image: Image, id: number):Observable<any>{
    return this.httpClient.put<Image>(`http://localhost:8080/images/update/${id}`, image)
  }
  deleteById(id: number): Observable<any>{
    return this.httpClient.delete<Image>(`http://localhost:8080/images/${id}`)
  }
  deleteProduct(id: number):Observable<any>{
    return this.httpClient.delete<any>(`${apiUrl}/images/delete/product/${id}`);
  }
  findAllFilter():Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${apiUrl}/images/filters`);
  }
  findAllByCategoryId(id: number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${apiUrl}/images/category/${id}`)
  }
  findAllByProductName(name: string): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${apiUrl}/images/product_name/${name}`)
  }

}
