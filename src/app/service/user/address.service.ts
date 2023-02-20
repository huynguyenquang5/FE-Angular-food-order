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
    return this.http.get<Address[]>(`${apiUrl}/address/${id}`)
  }

  findOneById(id: number): Observable<Address> {
    return this.http.get<Address>(`${apiUrl}/address/addressId=${id}`)
  }

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(`${apiUrl}/address`, address)
  }

  update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${apiUrl}/address/${id}`, address)
  }

  delete(id: number): Observable<Address> {
    return this.http.delete<Address>(`${apiUrl}/address/${id}`);
  }
}
