import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {Category} from "../../model/product/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}
  save(category: Category): Observable<any>{
    return this.httpClient.post<Category>(`http://localhost:8080/categories/create`, category)
  }
  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`http://localhost:8080/categories`)
  }
  findOne(id: number): Observable<Category>{
    return this.httpClient.get<Category>(`http://localhost:8080/categories/${id}`)
  }
}
