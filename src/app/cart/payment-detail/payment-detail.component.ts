import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../service/cart/cart.service";
import {UserService} from "../../service/user/user.service";
import {Payment} from "../../model/cart/payment";
import {formatDate} from "@angular/common";
import {Invoice} from "../../model/cart/invoice";
import {User} from "../../model/user/user";
import {StoreService} from 'src/app/service/store/store.service';
import {Store} from "../../model/store/store";

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  paymentId!: number;
  userId!: number;
  payment!: Payment;
  user!: User;
  listInvoice: Invoice[] = []

  ngOnInit(): void {
    this.paymentId = Number(this.routerActive.snapshot.paramMap.get("paymentId"))
    // @ts-ignore
    this.userId = sessionStorage.getItem("user.id")
    this.userId = 1;
    this.detailPayment(this.paymentId);
    this.listInvoiceByPayment(this.paymentId)
    this.detailUser(this.userId)
  }

  constructor(private routerActive: ActivatedRoute,
              private cartService: CartService,
              private userService: UserService,
              private storeService: StoreService) {
  }

  detailPayment(paymentId: number) {
    this.cartService.detailPayment(paymentId).subscribe(data => {
      this.payment = data;
    })
  }

  detailUser(userId: number) {
    this.userService.findUserById(userId).subscribe(data => {
      this.user = data;
    })
  }

  listInvoiceByPayment(paymentId: number) {
    this.cartService.listInvoiceByPayment(paymentId).subscribe(data => {
      this.listInvoice = data;
    })
  }

  displayDate(date: string) {
    return formatDate(date, 'dd/MM/yyyy', 'en-US')
  }
}
