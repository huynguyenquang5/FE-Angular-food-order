import {Component, OnInit} from '@angular/core';
import {Payment} from "../../model/cart/payment";
import {formatDate} from "@angular/common";
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {CartService} from "../../service/cart/cart.service";
import {UserService} from "../../service/user/user.service";
import {Store} from "../../model/store/store";


@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  userId!: number;
  storeId!: number;
  store!: Store;
  ListPayment: Payment[] = [];

  ngOnInit(): void {
    // @ts-ignore
    this.userId = sessionStorage.getItem('user.id')
    this.storeId = Number(this.routerActive.snapshot.paramMap.get("storeId"))
    this.storeId = 1;
    this.detailStore(this.storeId);
    this.listPaymentByStore(this.storeId)
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive: ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private router: Router,
              private userService: UserService) {
  }

  displayDate(date: string) {
    return formatDate(date, 'dd/MM/yyyy', 'en-US')
  }

  detailStore(storeId: number) {
    this.storeService.findByUserId(storeId).subscribe(data => {
      this.store = data;
    })
  }
  listPaymentByStore(storeId: number) {
    this.cartService.listPaymentByStore(storeId).subscribe(data => {
      this.ListPayment = data;
    })
  }

  changeStatusPayment(p: Payment, status: string) {
    this.cartService.statusPayment(p.id,status).subscribe(data => {
      this.listPaymentByStore(this.storeId)
    })
  }
}
