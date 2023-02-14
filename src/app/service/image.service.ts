import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../model/product/image";
import {environment} from "../../environments/environment";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http:HttpClient) { }
  findAllByProduct(productId: number):Observable<Image[]>{
    return this.http.get<Image[]>(`${apiUrl}/images/product/${productId}`);
  }
  findAllFilter():Observable<Image[]>{
    return this.http.get<Image[]>(`${apiUrl}/images/filters`);
  }
  findAllFilterStore(storeId: number):Observable<Image[]>{
    return this.http.get<Image[]>(`${apiUrl}/images/filters/${storeId}`);
  }
}
