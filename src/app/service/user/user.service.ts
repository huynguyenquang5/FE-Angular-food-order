import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";
import {environment} from "../../../environments/environment";
import {Store} from "../../model/store/store";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${apiUrl}/users`)
  }
  findUserById(id : number): Observable<User>{
    return this.httpClient.get<User>(`${apiUrl}/users/${id}`)
  }
  save(user: User): Observable<any>{
    return this.httpClient.post<User>(`${apiUrl}/accounts/register`, user)
  }
  login(user : User): Observable<any>{
    return this.httpClient.post<User>(`${apiUrl}/users/login`, user)}

  findById(id : number): Observable<User> {
    return this.httpClient.get<User>(`${apiUrl}/users/${id}`)}

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${apiUrl}/users/${id}`, user);
  }
  findUserByName(name: string): Observable<User>{
    return this.httpClient.get<User>(`${apiUrl}/users/${name}`)

  }
}
