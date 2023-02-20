import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/security/auth.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User
  formUser!: FormGroup
  roles: string[] = [];
  username!: string
  errorMessage = '';
  status!: number;
  userCheck!: User



  constructor(private userService: UserService,
              private router: Router,
              private routerActive: ActivatedRoute,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,

  ) {

  }

  ngOnInit(): void {
    this.formUser = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
  this.authService.login(this.formUser.value).subscribe(
      data => {
        this.userCheck= data
        console.log(this.userCheck)
        if (this.userCheck.status == 0){
          Swal.fire(
            "Your account has been locked, please contact admin to unlock it"
          )
        }else {this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
          this.authService.isLoggedIn = true;
          this.username = this.tokenStorageService.getUser().username;
          this.roles = this.tokenStorageService.getUser().roles;
          console.log(this.tokenStorageService.getUser())
          this.formUser.reset();}

      },
      err => {
        this.errorMessage = err.error.message;
        this.authService.isLoggedIn = false;
        Swal.fire("Username or password is wrong, please re-enter")
        ;
      }
    );}





}
