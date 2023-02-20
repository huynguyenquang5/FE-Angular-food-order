import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../model/user/user";
import {FormControl, FormGroup} from "@angular/forms";
import {Address} from "../../model/user/address";
import {AddressService} from "../../service/user/address.service";

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  @Input() userId!: number;
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
              private addressService: AddressService) {
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get("userId"))
    // @ts-ignore
    this.addressForm.get("user.id")?.setValue(this.userId);
    this.userService.findById(this.userId).subscribe(data => {
      this.user = data;
      this.checkRole();
      this.getAllAddressById();
      // @ts-ignore
      this.userForm.patchValue(this.user);
      console.log()
    })
  }

  checkRole() {
    for (let i = 0; i < this.user.roles.length; i++) {
      if (this.user.roles[i].name == "SELLER") {
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
      this.userForm.get("status")?.setValue(3);
    }
    // @ts-ignore
    this.user = this.userForm.value
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      window.location.reload();
    })
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
}
