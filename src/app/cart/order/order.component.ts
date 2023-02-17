import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user/user";
import {Address} from "../../model/user/address";
import {formatDate, getLocaleDateFormat} from "@angular/common";
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {CartService} from "../../service/cart/cart.service";
import {Cart} from "../../model/cart/cart";
import {Product} from "../../model/product/product";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  ngOnInit(): void {
    this.storeId = Number(this.routerActive.snapshot.paramMap.get("storeId"))
    // @ts-ignore
    this.user = sessionStorage.getItem("user")
    // @ts-ignore
    this.user = this.us
    this.toDay = formatDate(this.date, 'dd/MM/yyyy', 'en-US');
    this.findAllCart(this.storeId,1)
  }
  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,) {
  }
  listAddress: Address[] = [];
  listCart: Cart[] = [];
  total:number = 0;
  user!:User;
  date =  Date.now();
  toDay!:string;
  storeId!:number;
  us = {
    name: "Minh",
    email: "minh@gmail.com",
    phone: "0345674235"
  }
  findAllCart(storeId:number,userId:number){
    this.cartService.findAllByStore(storeId,userId).subscribe(data =>{
      this.listCart = data;
      this.total = 0;
      for (let i =0; i< data.length;i++){
        this.total += this.listCart[i].price;
      }
    })
  }
  onDeleteProduct(product: Product) {
    this.cartService.deleteOne(1,product.id).subscribe(data =>{
      this.findAllCart(this.storeId,1)
    })
  }

  onActionQuantity(c: Cart) {
    this.cartService.changeQuantity(1,c.product.id).subscribe(data =>{
      this.findAllCart(this.storeId,1)
    })
  }
}
