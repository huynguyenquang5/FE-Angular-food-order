import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../model/product/image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http:HttpClient) { }
  findAllByProduct(productId: number):Observable<Image[]>{
    return this.http.get<Image[]>(`http://localhost:8080/images/product/${productId}`);
  }
}
