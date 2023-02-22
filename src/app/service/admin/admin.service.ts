import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";
import {environment} from "../../../environments/environment";
import {Address} from "../../model/user/address";
import {Store} from "../../model/store/store";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/admin/users`)
  }
  findOneUser(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/admin/users/${id}`)
  }
  findAllAddressesByUserId(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${API_URL}/address/${id}`)
  }
  findStoreByUserId(id: number): Observable<Store> {
    return this.http.get<Store>(`${API_URL}/store/user/${id}`);
  }
  activeBlockUser(id: number | undefined, status: number | undefined) : Observable<any> {
    // @ts-ignore
    return this.http.put(`${API_URL}/admin/users/id=${id}&status=${status}`);
  }
  addRoleMerchant(id: number | undefined): Observable<any> {
    // @ts-ignore
    return this.http.put(`${API_URL}/admin/users/id=${id}&add_role_merchant`);
  }
  addRoleMerchantPartner(id: number | undefined): Observable<any> {
    // @ts-ignore
    return this.http.put(`${API_URL}/admin/users/id=${id}&add_role_merchant_partner`);
  }
}
