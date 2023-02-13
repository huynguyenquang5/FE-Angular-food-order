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
}
