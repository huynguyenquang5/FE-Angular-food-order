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
import {User} from "../../model/user/user";
import {Product} from "../../model/product/product";
import {Invoice} from "../../model/cart/invoice";


@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  @ViewChild('ofModal') ofModal!: ElementRef;
  @ViewChild('selectSearch') selectSearch!: ElementRef;
  @ViewChild('valueSearchCode') valueSearchCode!: ElementRef;
  @ViewChild('valueSearchDay') valueSearchDay!: ElementRef;
  @ViewChild('valueSearchMonth') valueSearchMonth!: ElementRef;
  @ViewChild('valueSearchPrice') valueSearchPrice!: ElementRef;
  @ViewChild('valueSearchName') valueSearchName!: ElementRef;
  @ViewChild('valueSearchPhone') valueSearchPhone!: ElementRef;
  userId!: number;
  storeId!: number;
  total!: number;
  status!: number | undefined;
  store!: Store;
  payment!: Payment;
  listPayment: Payment[] = [];
  check: boolean = false;
  userCheck!: User;
  listProduct: Product[] = [];

  checkFilter: boolean = false;
  valueDate: any;
  valueStatus: any;
  checkCode: boolean = false;
  checkDate: boolean = false;
  checkPrice: boolean = false;
  checkBuyer: boolean = false;
  checkPhone: boolean = false;
  checkDay: boolean = false;
  checkMonth: boolean = false;
  checkMenuFilterAll: boolean = false;
  checkMenuFilterFood: boolean = false;

  ngOnInit(): void {
    this.listPaymentByStore(1)
    this.userId = this.storageToken.getUser().id;
    this.detailStore(this.userId);
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

  detailStore(id: number) {
    this.storeService.findByUserId(id).subscribe(data => {
      this.store = data;
      this.listPaymentByStore(data.id)
      this.findAllProductByStoreId(data.id)
      this.storeId = data.id
    },(error)=>{
    })
  }

  listPaymentByStore(storeId: number) {
    this.cartService.listPaymentByStore(storeId).subscribe(data => {
      this.listPayment = data;
      this.total = 0;
      for (let payment of data){
        this.total += payment.price;
      }
    })
  }

  changeStatusPayment(p: Payment, status: string) {
    this.cartService.statusPayment(p.id, status).subscribe(data => {
      this.listPaymentByStore(this.storeId)
      this.ofModal.nativeElement.click()
    })
  }

  onModal(p: Payment, text: string) {
    this.payment = p;
    if ("cancel" === text) {
      this.check = true;
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you want to cancel this order?";
    } else {
      this.check = false;
      // @ts-ignore
      document.getElementById("main").innerText = "Click ok if you accept to approve this order!";
    }
  }

  onSelectTypeDate() {
    switch (this.valueDate) {
      case "day":
        this.checkDay = true;
        this.checkMonth = false;
        break;
      case "month":
        this.checkDay = false;
        this.checkMonth = true;
        break;
    }
  }

  onChangeSelect() {
    switch (this.selectSearch.nativeElement.value) {
      case "all":
        this.checkCode = false;
        this.checkDate = false;
        this.checkPrice = false;
        this.checkBuyer = false;
        this.checkPhone = false;
        this.listPaymentByStore(this.storeId);
        break;
      case "code":
        this.checkCode = true;
        this.checkDate = false;
        this.checkPrice = false;
        this.checkBuyer = false;
        this.checkPhone = false;
        break;
      case "date":
        this.checkCode = false;
        this.checkDate = true;
        this.checkPrice = false;
        this.checkBuyer = false;
        this.checkPhone = false;
        break;
      case "price":
        this.checkCode = false;
        this.checkDate = false;
        this.checkPrice = true;
        this.checkBuyer = false;
        this.checkPhone = false;
        break;
      case "name":
        this.checkCode = false;
        this.checkDate = false;
        this.checkPrice = false;
        this.checkBuyer = true;
        this.checkPhone = false;
        break;
      case "phone":
        this.checkCode = false;
        this.checkDate = false;
        this.checkPrice = false;
        this.checkBuyer = false;
        this.checkPhone = true;
        break;
    }
  }

  onChangeStatus() {
    this.status = this.valueStatus
  }

  onSubmitFilter() {
    var filter;
    var typeSearch;
    if (undefined !== this.valueSearchCode && undefined === this.valueSearchDay && undefined === this.valueSearchMonth
      && undefined === this.valueSearchPrice && undefined === this.valueSearchName && undefined === this.valueSearchPhone) {
      //search by code
      typeSearch = "code";
      filter = {
        status: this.status,
        code: this.valueSearchCode.nativeElement.value,
        day: this.valueSearchDay,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone,
      }
    } else if (undefined === this.valueSearchCode && undefined !== this.valueSearchDay && undefined === this.valueSearchMonth
      && undefined === this.valueSearchPrice && undefined === this.valueSearchName && undefined === this.valueSearchPhone) {
      //search by day
      typeSearch = "day";
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay.nativeElement.value,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone,
      }
    } else if (undefined === this.valueSearchCode && undefined === this.valueSearchDay && undefined !== this.valueSearchMonth
      && undefined === this.valueSearchPrice && undefined === this.valueSearchName && undefined === this.valueSearchPhone) {
      //search by month
      typeSearch = "month";
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay,
        month: this.valueSearchMonth.nativeElement.value,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone,
      }
    } else if (undefined === this.valueSearchCode && undefined === this.valueSearchDay && undefined === this.valueSearchMonth
      && undefined !== this.valueSearchPrice && undefined === this.valueSearchName && undefined === this.valueSearchPhone) {
      //search by price
      if ("all" === this.valueSearchPrice.nativeElement.value.toLowerCase()) {
        typeSearch = "price-all";
      } else {
        typeSearch = "price";
      }
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice.nativeElement.value,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone,
      }
    } else if (undefined === this.valueSearchCode && undefined === this.valueSearchDay && undefined === this.valueSearchMonth
      && undefined === this.valueSearchPrice && undefined !== this.valueSearchName && undefined === this.valueSearchPhone) {
      //search by name buyer
      typeSearch = "buyer";
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName.nativeElement.value,
        phone: this.valueSearchPhone,
      }
    } else if (undefined === this.valueSearchCode && undefined === this.valueSearchDay && undefined === this.valueSearchMonth
      && undefined === this.valueSearchPrice && undefined === this.valueSearchName && undefined !== this.valueSearchPhone) {
      //search by phone
      typeSearch = "phone";
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone.nativeElement.value,
      }
    } else {
      typeSearch = "status";
      filter = {
        status: this.status,
        code: this.valueSearchCode,
        day: this.valueSearchDay,
        month: this.valueSearchMonth,
        price: this.valueSearchPrice,
        buyer: this.valueSearchName,
        phone: this.valueSearchPhone,
      }
    }
    this.cartService.listPaymentByStoreAndFilter(1, filter, typeSearch).subscribe(data => {
      this.listPayment = data;
      this.total = 0;
      for (let payment of data){
        this.total += payment.price;
      }
    })
  }

  onFilterMenu() {
    this.checkMenuFilterAll = ! this.checkMenuFilterAll;
    this.checkCode = false;
    this.checkDate = false;
    this.checkPrice = false;
    this.checkBuyer = false;
    this.checkPhone = false;
  }

  findAllProductByStoreId(id: number) {
    this.productService.findAllByStore(id).subscribe(data => {
      this.listProduct = data

    })
  }

  findAllInvoiceByProduct(id: number) {
    this.cartService.findAllInvoiceByProductId(id).subscribe(data => {
      let listPayments: Payment[] = []
      for (let i = 0; i < data.length; i++) {
        listPayments.push(data[i].payment)
      }
      this.listPayment = listPayments
    })
  }

  filterByProductId(event: Event) {
    let id = parseInt((event.target as HTMLSelectElement).value);
    if (id == 0|| id == null){
      this.listPaymentByStore(this.storeId)

    }else{
      this.findAllInvoiceByProduct(id)
    }
  }
  search(event: Event){
    let name = (<HTMLSelectElement> (event.target)).value
    if (name == "" || name ==null){
      this.listPaymentByStore(this.storeId)
    }else{
      this.cartService.findAllInvoiceByProductName(name, this.storeId).subscribe(data=>{
        let listPayments: Payment[] = []
        for (let i = 0; i < data.length; i++) {
          listPayments.push(data[i].payment)
        }
        this.listPayment = listPayments
      })
    }


  }

  onMenuFilterFood() {
    this.checkMenuFilterFood = !this.checkMenuFilterFood;
  }
}
