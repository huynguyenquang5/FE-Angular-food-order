import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/security/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{


  constructor(private storageToken: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
  }
  logOut(){
    this.storageToken.signOut();
    this.router.navigate([''])
  }

}
