import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions: any;
  isLoggedIn!: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(user: User): Observable<any> {
    return this.http.post(`${apiUrl}/users/login`, {
      username: user.username,
      password: user.password
    }, this.httpOptions);
  }
  }



