import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../model/user/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  userId!: number;
  user!: User;
  role!: string;
  userForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(""),
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    phone: new FormControl(""),
    wallet: new FormControl(""),
    status: new FormControl(""),
    roles: new FormControl("")
  })

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get("userId"))
    this.userService.findById(this.userId).subscribe(data => {
      this.user = data;
      this.checkRole();
      // @ts-ignore
      this.userForm.patchValue(this.user);
      console.log()
    })
  }

  checkRole() {
    for (let i = 0; i < this.user.roles.length; i++) {
      if (this.user.roles[i].name == "MERCHANT") {
        this.role = this.user.roles[i].name;
      }
    }
  }

  changePasswordBox() {
    let changePassword = document.getElementById("changePassword");
    let editProfile = document.getElementById("editProfile");
    // @ts-ignore
    if (changePassword.style.display === "none") {
      // @ts-ignore
      changePassword.style.display = "block"
      // @ts-ignore
      editProfile.style.display = "none";
    } else {
      // @ts-ignore
      changePassword.style.display = "none";
      // @ts-ignore
    }
  }

  editProfileBox() {
    let editProfile = document.getElementById("editProfile");
    let changePassword = document.getElementById("changePassword");
    // @ts-ignore
    if (editProfile.style.display === "none") {
      // @ts-ignore
      editProfile.style.display = "block";
      // @ts-ignore
      changePassword.style.display = "none";
    } else {
      // @ts-ignore
      editProfile.style.display = "none";
    }
  }

  updateUser() {
    // @ts-ignore
    if (document.getElementById("checkboxStatus").checked == true) {
      // @ts-ignore
      this.userForm.get("status")?.setValue(3);
    }
    // @ts-ignore
    this.user = this.userForm.value
    this.userService.updateUser(this.userId, this.user).subscribe( () => {
      alert("Update successfully")
      window.location.reload();
    })
  }
}
