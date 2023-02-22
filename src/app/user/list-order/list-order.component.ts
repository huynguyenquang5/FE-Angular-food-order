import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {CartService} from "../../service/cart/cart.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {Payment} from "../../model/cart/payment";
import {formatDate} from "@angular/common";
import {TokenStorageService} from "../../service/security/token-storage.service";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  ngOnInit(): void {
    this.userId = this.storageToken.getUser().id;
    this.userDetail(this.userId);
    this.listPaymentByUser(this.userId);
  }

  constructor(private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private router: Router,
              private userService: UserService,
              private storageToken: TokenStorageService) {
  }
  @ViewChild('ofModal') ofModal!: ElementRef;
  paymentModal!:Payment;
  userId !:number;
  user!:User;
  listPayment:Payment[]=[];
  check:boolean=false;
  userDetail(userId:number){
    this.userService.findUserById(userId).subscribe(data=>{
      this.user = data;
    })
  }
  listPaymentByUser(userId:number){
    this.cartService.paymentsUser(userId).subscribe(data=>{
      this.listPayment = data;
    })
  }
  displayDate(date:string){
    return formatDate(date, 'dd/MM/yyyy', 'en-US')
  }

  onStatusPayment(p: Payment, number: number) {
    let status!:string;
    switch (number){
      case 0: status = 'cancel';break;
      case 3: status = 'success';break;
    }
    this.cartService.statusPayment(p.id,status).subscribe(data=>{
      this.listPaymentByUser(this.user.id);
      this.ofModal.nativeElement.click()
    })
  }

  onModal(p: Payment, action: string){
    this.paymentModal = p;
    if ('cancel' === action){
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you want to cancel this order?";
      this.check = false;
    }else {
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you have received the order?";
      this.check = true;
    }
  }
  logOut(){
    this.storageToken.signOut();
    this.router.navigate([''])
  }
}
