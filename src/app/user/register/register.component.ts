import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user/user";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../model/user/role";
import {RoleService} from "../../service/user/role.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formUser!: FormGroup;
  user!: User
  listPhone!: string[]
  listEmail!: string[]
  listRole!: Role[]
  listUser!: User[]
  listUserName!: string[]


  constructor(private userService: UserService,
              private router: Router,
              private routerActive: ActivatedRoute,
              private roleService: RoleService) {
  }

  ngOnInit() {
    this.roleService.findAll().subscribe((data) => {
        this.listRole = data
        for (let i = 0; i < this.listRole.length; i++) {
          if (this.listRole[i].id == 1) {
            this.listRole.splice(i, 1)
          }
        }
      }
    )
    this.userService.findAll().subscribe((data) => {
      this.listUser = data
      this.listEmail = new Array()
      this.listPhone = new Array()
      this.listUserName = new Array()

      for (let u of this.listUser) {
        this.listEmail.push(u.email)
        this.listPhone.push(u.phone)
        this.listUserName.push(u.username)
      }
    })
    this.formUser = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('',Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('',Validators.compose([Validators.required, Validators.min(6)])),
      phone: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^0\d{8,9}$/)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormGroup({
        id: new FormControl('')
      })

    })
  }

  register() {
    let i: number = 0;
    let j: number = 0;
    let k: number = 0;
    this.user = this.formUser.value
    if (this.user.username == ''|| this.user.username == null || this.user.password == ''|| this.user.password == null || this.user.email == ''|| this.user.email == null || this.user.phone == ''|| this.user.phone == null){
      Swal.fire("Please enter enough information")
    }else{
    for (let e of this.listEmail) {
      if (this.user.email == e) {
        i++
        break;
      }
    }
    for (let p of this.listPhone) {
      if (this.user.phone == p) {
        j++
        break
      }
    }
    for (let u of this.listUserName) {
      if (this.user.username == u) {
        k++
        break
      }
    }

    if (this.user.password == this.user.confirmPassword) {
      if (k == 0) {
        if (j == 0) {
          if (i == 0) {
            this.userService.save(this.user).subscribe()
            Swal.fire("Your account has been created successfully, please login ")
            this.router.navigate(['accounts/login'])
          } else {
            Swal.fire('Email already exist, please re-enter!')
          }
        } else {
          Swal.fire("Phone already exist please re-enter!")
        }
      } else {
        Swal.fire("User name already exist, please re-enter!")
      }
    } else {
      Swal.fire("Re-entered password is not the same, please re-enter")
    }}
  }
  login(){
    this.router.navigate(['accounts/login'])
  }


}
