import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../../model/product/image";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {}
  save(image: Image): Observable<any>{
    return this.httpClient.post<Image>(`http://localhost:8080/products/create`, image)
  }
  create(image: Image): Observable<any>{
    return this.httpClient.post<Image>(`http://localhost:8080/images/create`, image)
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
}
