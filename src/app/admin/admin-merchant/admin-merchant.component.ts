import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {User} from "../../model/user/user";
import {Address} from "../../model/user/address";
import {Store} from "../../model/store/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-merchant',
  templateUrl: './admin-merchant.component.html',
  styleUrls: ['./admin-merchant.component.css']
})
export class AdminMerchantComponent implements OnInit {
  user!: User;
  store!: Store;
  users: User[] = [];
  addresses: Address[] = [];
  id: number | undefined;
  status: number | undefined;
  total!: number;
  constructor(private adminService: AdminService,
              private router: Router) {
  }
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.adminService.findAllUsers().subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].status == 0 || users[i].status == 1){
          for (let j = 0; j < users[i].roles.length; j++) {
            if (users[i].roles[j].name == "MERCHANT") {
              this.users.push(users[i]);
            }
          }
        }
      }
    });
  }
  getOneUser(id: number) {
    this.adminService.findOneUser(id).subscribe((data) => {
      this.user = data;
    })
    this.adminService.findAllAddressesByUserId(id).subscribe((data) => {
      this.addresses = data;
    })
    this.adminService.findStoreByUserId(id).subscribe((data) => {
      this.store = data;
      this.total = data.wallet;
    })
  }
  getIdAndStatus(id: number | undefined, status: number | undefined) {
    this.id = id;
    this.status = status;
  }
  activeUser() {
    this.adminService.activeBlockUser(this.id, this.status).subscribe( () => {
      window.location.reload();
    }, error => {
      alert("Something wrong")
      console.log(error);
    })
  }
}
