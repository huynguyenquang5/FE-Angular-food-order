import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http:HttpClient) { }

}
