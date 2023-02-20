import {TokenStorageService} from "../../service/security/token-storage.service";
import {Role} from "../../model/user/role";
import {Roles} from "../../model/user/roles";
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
export class HomeHeaderComponent implements OnInit {


  username!: string;
  idUser!: number;
  currentUser!: string;
  role!: string;
  roles: Roles = new Roles();
  isLoggedIn: boolean = false;
  isSeller: boolean = false;
  isBuyer: boolean = false;
  isAdmin:boolean = false;
  isPartner: boolean = false;


  constructor(private tokenStorageService: TokenStorageService,
  ) {

  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.roles = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;

    }
    this.isLoggedIn = (this.username != null);
    this.isBuyer = (this.roles.authority == "BUYER")
    this.isAdmin =(this.roles.authority == "ADMIN")
    this.isSeller =  (this.roles.authority == "SELLER" )
    this.isPartner = (this.roles.authority == "PARTNER")
    this.getUsernameAccount();

  }


  ngOnInit(): void {
    this.loadHeader();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.ngOnInit();
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getToken()) {
      this.idUser = this.tokenStorageService.getUser().id;
    }
  }
}

