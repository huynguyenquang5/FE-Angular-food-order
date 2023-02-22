import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {User} from "../../model/user/user";

@Component({
  selector: 'app-admin-merchant-pending',
  templateUrl: './admin-merchant-pending.component.html',
  styleUrls: ['./admin-merchant-pending.component.css']
})
export class AdminMerchantPendingComponent implements OnInit {
  users: User[] = [];
  id: number | undefined;
  constructor(private adminService: AdminService) {
  }
  ngOnInit() {
    this.adminService.findAllUsers().subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].status == 2) {
          this.users.push(users[i]);
        }
      }
    });
  }
  getId(id: number | undefined) {
    this.id = id;
  }
  acceptMerchant() {
    this.adminService.addRoleMerchant(this.id).subscribe( () => {
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

  denyMerchant() {
    this.adminService.activeBlockUser(this.id, 1).subscribe( () => {
      window.location.reload();
    }, error => {
      alert("Something wrong");
      console.log(error);
    })
  }
}
