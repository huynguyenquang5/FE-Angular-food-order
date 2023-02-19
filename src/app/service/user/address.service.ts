import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../../model/user/address";
import {environment} from "../../../environments/environment";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {
  }

  findAllByUserId(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${apiUrl}/users/address/${id}`)
  }

  findOneById(id: number): Observable<Address> {
    return this.http.get<Address>(`${apiUrl}/users/address/addressId=${id}`)
  }

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(`${apiUrl}/users/address`, address)
  }

  update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${apiUrl}/users/address/${id}`, address)
  }

  delete(id: number): Observable<Address> {
    return this.http.delete<Address>(`${apiUrl}/users/address/${id}`);
  }
}
