import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {CartService} from "../../service/cart/cart.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {Payment} from "../../model/cart/payment";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  ngOnInit(): void {
    this.userId = Number(this.routerActive.snapshot.paramMap.get("userId"))
    this.userDetail(this.userId);
    this.listPaymentByUser(1);
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private router: Router,
              private userService: UserService) {
  }
  userId !:number;
  user!:User;
  listPayment:Payment[]=[];
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
      this.listPaymentByUser(1);
    })
  }
}
