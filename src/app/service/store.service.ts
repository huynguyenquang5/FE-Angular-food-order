import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "../model/store/store";
import {environment} from "../../environments/environment";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  findById(id : number): Observable<Store>{
    return this.http.get<Store>(`${apiUrl}/store/${id}`)
  }
  findAll(): Observable<Store[]>{
    return this.http.get<Store[]>(`${apiUrl}/store`)
  }
}
