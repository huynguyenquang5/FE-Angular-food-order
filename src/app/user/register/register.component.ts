import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user/user";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../model/user/role";
import {RoleService} from "../../service/user/role.service";

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
      console.log(this.listUserName)
    })
    this.formUser = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      confirmPassword: new FormControl(''),
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
            alert("Success")
          } else {
            alert('Email already exist, please re-enter!')
          }
        } else {
          alert("Phone already exist please re-enter!")
        }
      } else {
        alert("User name already exist, please re-enter!")
      }
    } else {
      alert("Re-entered password is not the same, please re-enter")
    }
  }


}