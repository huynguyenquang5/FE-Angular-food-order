import {Component, Input, OnInit} from '@angular/core';
import { ProductService } from '../../service/store/product.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Product } from '../../model/product/product';
import {FormControl, FormGroup} from "@angular/forms";
import {Image} from "../../model/product/image";
import {ImageService} from "../../service/store/image.service";
import { StoreService } from '../../service/store/store.service';
import {Store} from "../../model/store/store";
import {CartService} from "../../service/cart/cart.service";
import {Message} from "../../model/message/message";
import {User} from "../../model/user/user";
import {Cart} from "../../model/cart/cart";
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent implements OnInit {
  ngOnInit(): void {
    this.storeId = Number(this.routerActive.snapshot.paramMap.get("storeId"))
    // @ts-ignore
    this.userId = sessionStorage.getItem("user.id");
    this.userDetail(this.userId);
    this.storeService.findById(this.storeId).subscribe(data => {
      this.store = data
      this.imageService.findAllFilterStore(this.store.id).subscribe(data =>{
        this.listImageFilter = data;
        this.classify(data);
        this.product = this.listProduct[0];
        this.findAllCart(this.store.id,1)
        this.addMapProduct()
      })
    })
  }
  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private userService: UserService) {
  }
  show : boolean = false;
  storeId !:number;
  userId !:number;
  user!:User;
  listProduct : Product[] = [];
  listProductMains : Image[] = [];
  listProductDrinks : Image[] = [];
  listImage : Image[] = [];
  listImageFilter : Image[] = [];
  listCart : Cart[] = [];
  classify(products : Image[]){
    for (let i = 0; i < products.length; i++) {
      if (products[i].product.productMethod.category.name.toUpperCase() !== "DRINK"){
        this.listProductMains.push(products[i]);
      }else {
        this.listProductDrinks.push(products[i]);
      }
    }
  }
  formFood !: FormGroup;
  product !: Product ;
  store !: Store ;
  img !: Image;
  message !: Message;
  total : number =0;
  map = new Map();
  onDetailFood(p: Product) {
    let id :number = p.id;
    this.imageService.findAllByProduct(id).subscribe(data => {
      this.listImage = data;
      this.img = this.listImage[this.listImage.length-1];
      this.listImage.pop();
      this.product = p;
      this.show = true;
    })
  }
  userDetail(userId:number){
    this.userService.findUserById(userId).subscribe(data=>{
      this.user = data;
    })
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
  onAddCart(p: Image) {
    let cart = {
      id: 0,
      quantity: 1,
      price:p.product.productMethod.price,
      user:{
        id: 1
      },
      product:{
        id: p.product.id
      }
    }
    this.cartService.save(cart).subscribe(data => {
      this.message = data;
      this.findAllCart(this.store.id,1)
    })
  }
  addMapProduct() {
    for (let img of this.listImageFilter) {
      this.map.set(img.product.id,img)
    }
  }
  onDeleteProduct(product: Product) {
    this.cartService.deleteOne(1,product.id).subscribe(data =>{
      this.findAllCart(this.store.id,1)
    })
  }

  onActionQuantity(c: Cart) {
    this.cartService.changeQuantity(1,c.product.id).subscribe(data =>{
      this.findAllCart(this.store.id,1)
    })
  }
}