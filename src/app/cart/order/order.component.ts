import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {Store} from "../../model/store/store";
import {AddressService} from "../../service/user/address.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
    this.storeDetail()
    this.findAllCart(this.storeId,this.user.id)
    this.findALlAddress()
  }
  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService,
              private addressService: AddressService,) {
  }
  listAddress: Address[] = [];
  listCart: Cart[] = [];
  total:number = 0;
  user!:User;
  store!:Store;
  date =  Date.now();
  toDay!:string;
  storeId!:number;
  us = {
    id:1,
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
  storeDetail(){
    this.storeService.findById(this.storeId).subscribe(data=>{
      this.store = data;
    })
  }
  onDeleteProduct(product: Product) {
    this.cartService.deleteOne(this.user.id,product.id).subscribe(data =>{
      this.findAllCart(this.storeId,this.user.id)
    })
  }

  onActionQuantity(c: Cart) {
    this.cartService.changeQuantity(this.user.id,c.product.id).subscribe(data =>{
      this.findAllCart(this.storeId,this.user.id)
    })
  }

  @ViewChild("valueSelectAddress") valueSelectAddress !: ElementRef;
  onSubmitOrder() {
    this.cartService.paymentOrder(this.user.id,this.storeId,this.valueSelectAddress.nativeElement.value).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      this.findAllCart(this.storeId,this.user.id)
    })
  }
  @ViewChild("newAddress") newAddress !: ElementRef;
  onSubmitAddress() {
    let address = {
      id: 0,
      name: this.newAddress.nativeElement.value,
      user: {
        id:this.user.id
      }
    }
    let timerInterval:any;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result:any) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    this.addressService.save(address).subscribe(data => {
      this.findALlAddress()
      this.newAddress.nativeElement.value = null;
    })
  }
  findALlAddress(){
    this.addressService.findAllByUser(this.user.id).subscribe(data=>{
      this.listAddress = data;
    })
  }

  onDeleteAddress(a: Address) {
    this.addressService.deleteAddress(a.id).subscribe(data => {
      this.findALlAddress()
    })
  }
}
