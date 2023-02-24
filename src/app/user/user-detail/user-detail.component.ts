import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user/user";
import {Address} from "../../model/user/address";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../service/user/address.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user!: User;
  role!: string;
  addresses!: Address[];
  address!: Address;
  addressId!: number;

  userForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(""),
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    phone: new FormControl(""),
    wallet: new FormControl(""),
    status: new FormControl(""),
    roles: new FormControl("")
  })

  addressForm = new FormGroup({
    name: new FormControl(""),
    user: new FormGroup({
      id: new FormControl("")
    })
  })

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private addressService: AddressService,
              private tokenStorageService: TokenStorageService,
              private router:Router,) {
  }

  ngOnInit() {
    this.userId = this.tokenStorageService.getUser().id
    // @ts-ignore
    this.addressForm.get("user.id")?.setValue(this.userId);
    this.userService.findById(this.userId).subscribe(data => {
      this.user = data;
      this.checkRole();
      this.getAllAddressById();
      // @ts-ignore
      this.userForm.patchValue(this.user)
    })
  }

  checkRole() {
    for (let i = 0; i < this.user.roles.length; i++) {
      if (this.user.roles[i].name == "USER") {
        this.role = this.user.roles[i].name;
      }
    }
  }

  boxHiddenShow(box: string) {
    let changePassword = document.getElementById("changePassword");
    let editProfile = document.getElementById("editProfile");
    let createAddress = document.getElementById("createAddress");
    let updateAddress = document.getElementById("updateAddress");
    switch (box) {
      case "password":
        // @ts-ignore
        if (changePassword.style.display === "none") {
          // @ts-ignore
          changePassword.style.display = "block"
          // @ts-ignore
          editProfile.style.display = "none";
          // @ts-ignore
          createAddress.style.display = "none";
          // @ts-ignore
          updateAddress.style.display = "none";
        }
        break;
      case "editProfile":
        // @ts-ignore
        if (editProfile.style.display === "none") {
          // @ts-ignore
          editProfile.style.display = "block";
          // @ts-ignore
          changePassword.style.display = "none";
          // @ts-ignore
          createAddress.style.display = "none";
          // @ts-ignore
          updateAddress.style.display = "none";
        }
        break;
      case "createAddress":
        // @ts-ignore
        if (createAddress.style.display === "none") {
          // @ts-ignore
          createAddress.style.display = "block";
          // @ts-ignore
          changePassword.style.display = "none";
          // @ts-ignore
          editProfile.style.display = "none";
          // @ts-ignore
          updateAddress.style.display = "none";
        }
        break;
      case "updateAddress":
        // @ts-ignore
        if (updateAddress.style.display === "none") {
          // @ts-ignore
          updateAddress.style.display = "block";
          // @ts-ignore
          createAddress.style.display = "none";
          // @ts-ignore
          changePassword.style.display = "none";
          // @ts-ignore
          editProfile.style.display = "none";
        }
        break;
    }
  }

  getAllAddressById() {
    this.addressService.findAllByUserId(this.userId).subscribe( data => {
      this.addresses = data;
    })
  }

  getAddressById(id: number) {
    this.addressService.findOneById(id).subscribe( address => {
      this.addressId = address.id;
      let fullAddress = address.name;
      let addressLine = fullAddress.split(", ")[0];
      let district = fullAddress.split(", ")[1];
      let city = fullAddress.split(", ")[2];
      // @ts-ignore
      document.getElementById("addressUpdate").value = addressLine;
      // @ts-ignore
      document.getElementById("districtUpdate").value = district;
      // @ts-ignore
      document.getElementById("cityUpdate").value = city;
    })
  }

  updateUser() {
    // @ts-ignore
    if (document.getElementById("checkboxStatus").checked == true) {
      // @ts-ignore
      this.userForm.get("status")?.setValue(2);
    }
    // @ts-ignore
    this.user = this.userForm.value
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      window.location.reload();
    })
  }
  changePassword() {
    // @ts-ignore
    let oldPassword = document.getElementById("oldPassword").value
    // @ts-ignore
    let newPassword = document.getElementById("newPassword").value
    // @ts-ignore
    let confirmNewPassword = document.getElementById("confirmNewPassword").value
    if (oldPassword != "" && newPassword != "" && confirmNewPassword != "") {
      if (oldPassword == this.user.confirmPassword) {
        if (newPassword != oldPassword) {
          if (newPassword == confirmNewPassword) {
            this.userForm.get("password")?.setValue(newPassword);
            this.userForm.get("confirmPassword")?.setValue(newPassword);
            // @ts-ignore
            this.user = this.userForm.value
            this.userService.changePassword(this.userId, this.user).subscribe(() => {
              Swal.fire("Change password successfully. Please login again!")
              this.tokenStorageService.signOut();
              this.router.navigate(['/accounts/login'])
            }, error => {
              alert("Something wrong!")
              console.log(this.user);
            })
          } else {
            Swal.fire("Wrong confirm password!")
          }
        } else {
          Swal.fire("New password is the same as old password. Please choose another new password!")
        }
      } else {
        Swal.fire("Wrong old password!")
      }
    } else {
      Swal.fire("Please enter password!")
    }
  }
  createAddress() {
    // @ts-ignore
    let addressLine = document.getElementById("address").value
    // @ts-ignore
    let district = document.getElementById("district").value
    // @ts-ignore
    let city = document.getElementById("city").value
    let result = addressLine.concat(", ", district, ", ", city);
    this.addressForm.get("name")?.setValue(result);
    // @ts-ignore
    this.address = this.addressForm.value;
    this.addressService.create(this.address).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    })
  }

  updateAddress() {
    // @ts-ignore
    let addressUpdate = document.getElementById("addressUpdate").value
    // @ts-ignore
    let districtUpdate = document.getElementById("districtUpdate").value
    // @ts-ignore
    let cityUpdate = document.getElementById("cityUpdate").value
    let resultUpdate = addressUpdate.concat(", ", districtUpdate, ", ", cityUpdate);
    this.addressForm.get("name")?.setValue(resultUpdate);
    // @ts-ignore
    this.address = this.addressForm.value;
    this.addressService.update(this.addressId, this.address).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    })
  }

  deleteAddress() {
    this.addressService.delete(this.addressId).subscribe( () => {
      window.location.reload();
    })
  }

  logOut(){
    this.tokenStorageService.signOut();
    this.router.navigate([''])
  }
}
