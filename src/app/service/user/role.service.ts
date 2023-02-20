import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Role} from "../../model/user/role";
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private httpClient : HttpClient) { }
  findAll(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${apiUrl}/users/roles`)
  }


}
