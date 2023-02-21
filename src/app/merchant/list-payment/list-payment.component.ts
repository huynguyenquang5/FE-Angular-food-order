import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Payment} from "../../model/cart/payment";
import {formatDate} from "@angular/common";
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {CartService} from "../../service/cart/cart.service";
import {UserService} from "../../service/user/user.service";
import {Store} from "../../model/store/store";
import {TokenStorageService} from "../../service/security/token-storage.service";


@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  @ViewChild('ofModal') ofModal!: ElementRef;
  userId!: number;
  storeId!: number;
  store!: Store;
  payment!: Payment;
  ListPayment: Payment[] = [];
  check: boolean = false;

  ngOnInit(): void {
    this.userId = this.storageToken.getUser().id;
    this.storeId = Number(this.routerActive.snapshot.paramMap.get("storeId"))
    this.detailStore(this.storeId);
    this.listPaymentByStore(this.storeId)
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive: ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private router: Router,
              private userService: UserService,
              private storageToken: TokenStorageService) {
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
      this.ofModal.nativeElement.click()
    })
  }

  onModal(p: Payment, text: string) {
    this.payment = p;
    if ("cancel" === text){
      this.check = true;
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you want to cancel this order?";
    }else {
      this.check = false;
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you accept to approve this order!";
    }
  }
}
