import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ImageService} from "../../service/store/image.service";
import {Image} from "../../model/product/image";
import {Cart} from "../../model/cart/cart";
import {CartService} from "../../service/cart/cart.service";
import {Product} from "../../model/product/product";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit{
  @Input() itemStoreId!: number;
  listImageFilter: Image[] = [];
  listCart: Cart[] = [];
  map = new Map();
  list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  total!: number;
  userId!: number;
  user!: User;
  checkCart: boolean = false;
  ngOnInit(): void {
    // @ts-ignore
    this.userId = sessionStorage.getItem("user.id")
    this.imageService.findAllFilterStore(this.itemStoreId).subscribe(data => {
      this.listImageFilter = data;
      this.findAllCart(this.itemStoreId,1);
      this.userDetail(this.userId)
    })
    this.list.push(10)
  }

  constructor(private imageService: ImageService,
              private cartService: CartService,
              private userService: UserService) {
  }
  userDetail(userId:number){
    this.userService.findUserById(userId).subscribe(data=>{
      this.user = data;
    })
  }

  findAllCart(storeId: number, userId: number) {
    this.cartService.findAllByStore(storeId, userId).subscribe(data => {
      this.listCart = data;
      this.totalPriceCart()
      this.filterProduct()
      this.checkCart = this.listCart.length > 0;
    })
  }

  totalPriceCart() {
    this.total = 0;
    for (let i of this.listCart) {
      this.total += i.price
    }
  }

  filterProduct() {
    for (let img of this.listImageFilter) {
      this.map.set(img.product.id,img)
    }
  }
}

