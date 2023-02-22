import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "../../model/store/store";
import {environment} from "../../../environments/environment";
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
  findByUserId(id: number): Observable<Store> {
    return this.http.get<Store>(`${apiUrl}/store/user/${id}`);
  }
  createStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${apiUrl}/store`, store);
  }
  updateStoreByUserId(id: number, store: Store): Observable<Store> {
    return this.http.put<Store>(`${apiUrl}/store/user/${id}`, store);
  }
}
