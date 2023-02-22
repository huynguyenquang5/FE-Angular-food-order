import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {AdminService} from "../../service/admin/admin.service";
import {Store} from "../../model/store/store";
import {Address} from "../../model/user/address";

@Component({
  selector: 'app-admin-partner-pending',
  templateUrl: './admin-partner-pending.component.html',
  styleUrls: ['./admin-partner-pending.component.css']
})
export class AdminPartnerPendingComponent implements OnInit {
  user!: User;
  store!: Store;
  users: User[] = [];
  addresses: Address[] = [];
  id: number | undefined;
  constructor(private adminService: AdminService) {
  }
  ngOnInit() {
    this.getAllUsers()
  }
  getAllUsers() {
    this.adminService.findAllUsers().subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].status == 3) {
          this.users.push(users[i]);
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
    })
  }
  getId(id: number | undefined) {
    this.id = id;
  }
  acceptPartner() {
    this.adminService.addRoleMerchantPartner(this.id).subscribe(() => {
      this.adminService.activeBlockUser(this.id, 1).subscribe(() => {
        window.location.reload();
      }, error => {
        console.log(error);
      })
    }, error => {
      alert("Something wrong");
      console.log(error);
    })
  }

  denyPartner() {
    this.adminService.activeBlockUser(this.id, 1).subscribe( () => {
      alert("Active successful");
      window.location.reload();
    }, error => {
      alert("Something wrong");
      console.log(error);
    })
  }

}
