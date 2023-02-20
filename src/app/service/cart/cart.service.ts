import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../../model/product/image";
import {Cart} from "../../model/cart/cart";
import {Payment} from "../../model/cart/payment";
import {Message} from "../../model/message/message";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  save(cart: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/cart`, cart);
  }

  findAllByStore(storeId: number, userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${apiUrl}/cart/store/${storeId}/user/${userId}`);
  }

  deleteOne(userId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/cart/delete/one/user/${userId}/product/${productId}`);
  }

  changeQuantity(userId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/cart/quantity/one/user/${userId}/product/${productId}`);
  }

  paymentOrder(userId: number, storeId: number, addressId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/cart/payment-cart/store/${storeId}/user/${userId}/address/${addressId}`);
  }

  paymentsUser(userId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${apiUrl}/cart/payment-order/user/${userId}`);
  }

  statusPayment(paymentId: number,status:string): Observable<Message> {
    return this.http.get<Message>(`${apiUrl}/cart/payment/${paymentId}/action/${status}`);
  }
}