import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http:HttpClient) { }
  save(address:any):Observable<any>{
    return this.http.post<any>(`${apiUrl}/users/address`, address);
  }
  findAllByUser(userId:number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/users/address/user/${userId}`);
  }
  deleteAddress(addressId:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/users/address/${addressId}`);
  }
}
