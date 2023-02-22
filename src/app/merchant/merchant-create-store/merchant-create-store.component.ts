import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StoreService} from "../../service/store/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {finalize} from "rxjs";
import {Store} from "../../model/store/store";

@Component({
  selector: 'app-merchant-create-store',
  templateUrl: './merchant-create-store.component.html',
  styleUrls: ['./merchant-create-store.component.css']
})
export class MerchantCreateStoreComponent implements OnInit {
  store!: Store;
  userId!: number;
  storeId!: number;
  imageFile: any;
  path!: string;
  pathName!: string;
  storeForm = new FormGroup({
    id: new FormControl(""),
    nameStore: new FormControl(""),
    phoneStore: new FormControl(""),
    addressStore: new FormControl(""),
    logo: new FormControl(""),
    description: new FormControl(""),
    wallet: new FormControl(""),
    user: new FormControl({
      id: new FormControl("")
    })
  })

  constructor(private storeService: StoreService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage,
              private storageToken: TokenStorageService
              ) {
  }

  ngOnInit() {
    this.userId = this.storageToken.getUser().id;
  }

  submitImage(event: any) {
    if (event.target.files && event.target.files[0]) {}
    this.imageFile = event.target.files[0];
    if (this.pathName !== this.imageFile.name) {
      this.pathName = this.imageFile.name;
      const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(imagePath);
      this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.path = url;
          });
        })
      ).subscribe()
    }
  }

  onSubmit() {
    const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          // @ts-ignore
          this.store = this.storeForm.value;
          this.store.user.id = this.userId;
          this.store.wallet = 0;
          this.store.logo = url;
          this.storeService.createStore(this.store).subscribe(() => {
            this.router.navigate(['/merchant/store'])
          }, e => {
            alert("Something Wrong")
            console.log(e);
          })
        })
      })
    ).subscribe();
  }
}
