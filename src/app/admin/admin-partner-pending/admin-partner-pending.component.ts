import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {AdminService} from "../../service/admin/admin.service";

@Component({
  selector: 'app-admin-partner-pending',
  templateUrl: './admin-partner-pending.component.html',
  styleUrls: ['./admin-partner-pending.component.css']
})
export class AdminPartnerPendingComponent implements OnInit {
  users: User[] = [];
  id: number | undefined;
  constructor(private adminService: AdminService) {
  }
  ngOnInit() {
    this.adminService.findAllUsers().subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].status == 3) {
          this.users.push(users[i]);
        }
      }
    });
  }
  getId(id: number | undefined) {
    this.id = id;
  }
  acceptPartner() {
    this.adminService.addRoleMerchantPartner(this.id).subscribe(() => {
      alert("Accept successful");
      this.adminService.activeBlockUser(this.id, 1).subscribe(() => {
        alert("Status successfully");
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
