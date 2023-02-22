import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {User} from "../../model/user/user";

@Component({
  selector: 'app-admin-merchant',
  templateUrl: './admin-merchant.component.html',
  styleUrls: ['./admin-merchant.component.css']
})
export class AdminMerchantComponent implements OnInit {
  users: User[] = [];
  id: number | undefined;
  status: number | undefined;
  constructor(private adminService: AdminService) {
  }
  ngOnInit() {
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
  getIdAndStatus(id: number | undefined, status: number | undefined) {
    this.id = id;
    this.status = status;
  }
  activeUser() {
    this.adminService.activeBlockUser(this.id, this.status).subscribe( () => {
      window.location.reload();
    }, error => {
      console.log(error);
    })
  }
}
