
import {TokenStorageService} from "../../service/security/token-storage.service";
import {Router} from "@angular/router";
import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {StoreService} from "../../service/store/store.service";
import {Store} from "../../model/store/store";
import Swal from "sweetalert2";

@Component({
  selector: 'app-merchant-nav',
  templateUrl: './merchant-nav.component.html',
  styleUrls: ['./merchant-nav.component.css'],
})
export class MerchantNavComponent implements OnInit {
  userId!: number;
  store!:Store;
  storeId!: number
  constructor(private elementRef: ElementRef,
              private tokenStorageService: TokenStorageService,
              private router:Router,
              private storeService: StoreService,
            ) {
    let s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "assets/admin_section/vendor/jquery/jquery.min.js";
    this.elementRef.nativeElement.appendChild(s2);

    let s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "assets/admin_section/vendor/bootstrap/js/bootstrap.min.js";
    this.elementRef.nativeElement.appendChild(s1);
  }
  ngOnInit() {
    this.userId = this.tokenStorageService.getUser().id
    this.storeDetail(this.userId)
  }

  logOut(){
    this.tokenStorageService.signOut();
    this.router.navigate([''])
  }
  storeDetail(userId:number){
    this.storeService.findByUserId(userId).subscribe(data=>{
      this.store = data;
      this.storeId = data.id
      })
  }
  listPaymentNavigate(){
    if (this.storeId == null || this.storeId == undefined){
      Swal.fire("You need to create store first!")
    }else {
      this.router.navigate(['/store/payment-list/store',this.store?.id])
    }
  }

}
