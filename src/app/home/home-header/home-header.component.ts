import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ImageService} from "../../service/store/image.service";
import {Image} from "../../model/product/image";
import {Cart} from "../../model/cart/cart";
import {CartService} from "../../service/cart/cart.service";
import {Product} from "../../model/product/product";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {Roles} from "../../model/user/roles";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {Payment} from "../../model/cart/payment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit{
  @Input() itemStoreId!: number;
  listImageFilter: Image[] = [];
  listCart: Cart[] = [];
  listPayment: Payment[] = [];
  map = new Map();
  total!: number;
  userId!: number;
  user!: User;
  checkCart: boolean = false;
  username!: string;
  currentUser!: string;
  role!: string;
  roles: Roles = new Roles();
  isLoggedIn: boolean = false;
  isSeller: boolean = false;
  isBuyer: boolean = false;
  isAdmin:boolean = false;
  isPartner: boolean = false;
  ngOnInit(): void {
    this.loadHeader();


  }

  constructor(private imageService: ImageService,
              private cartService: CartService,
              private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
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

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.roles = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
      this.userId = this.tokenStorageService.getUser().id;
      this.findAllPayment(this.userId)
    }
    this.isLoggedIn = (this.username != null);
    this.isBuyer = (this.roles.authority == "USER")
    this.isAdmin =(this.roles.authority == "ADMIN")
    this.isSeller =  (this.roles.authority == "MERCHANT")
    this.isPartner = (this.roles.authority == "PARTNER")
    this.getUsernameAccount();


  }

  logOut() {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate([""]);
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getToken()) {
      this.userId = this.tokenStorageService.getUser().id;
    }
  }
  findAllPayment(userId:number){
    this.cartService.paymentsUser(userId).subscribe(data =>{
      this.listPayment = data;
    })
  }
  userProfile(){
    this.router.navigate(['detail/user'])
  }
  merchantProfile(){
    this.router.navigate(['merchant'])
  }
  partnerProfile(){
    this.router.navigate(['users/merchant/',this.userId])
  }
}

