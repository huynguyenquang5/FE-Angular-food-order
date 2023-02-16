import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";
import {Store} from "../../model/store/store";

const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  findById(id : number): Observable<User> {
    return this.http.get<User>(`${apiUrl}/users/${id}`)
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${apiUrl}/users/${id}`, user);
  }
}
