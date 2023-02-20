import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/store/product.service";
import {ImageService} from "../../service/store/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../service/store/store.service";
import {Product} from "../../model/product/product";
import {Image} from "../../model/product/image";
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "../../model/store/store";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-merchant-store',
  templateUrl: './merchant-store.component.html',
  styleUrls: ['./merchant-store.component.css']
})
export class MerchantStoreComponent implements OnInit {
  show : boolean = false;
  userId !:number;
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
  ngOnInit(): void {
    this.userId = Number(this.routerActive.snapshot.paramMap.get("userId"))
    this.storeService.findByUserId(this.userId).subscribe(data => {
      this.store = data
      this.storeId = data.id;
      console.log(this.store)
      console.log(this.storeId)
      // @ts-ignore
      this.storeForm.patchValue(this.store);
      console.log(this.storeForm)
      this.imageService.findAllFilterStore(this.storeId).subscribe(data =>{
        this.listImageFilter = data;
        this.classify(data);
        this.product = this.listProduct[0];

      })
    })
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService,
              private storage: AngularFireStorage,
              private router: Router) {

  }


  listProduct : Product[] = [];
  listProductMains : Image[] = [];
  listProductDrinks : Image[] = [];
  listImage : Image[] = [];
  listImageFilter : Image[] = [];
  classify(products : Image[]){
    for (let i = 0; i < products.length; i++) {
      if (products[i].product.productMethod.category.name.toUpperCase() !== "DRINK"){
        this.listProductMains.push(products[i]);
      }else {
        this.listProductDrinks.push(products[i]);
      }
    }
  }
  formFood !: FormGroup;
  product !: Product ;
  store !: Store ;
  img !: string;

  onDetailFood(p: Product) {
    let id :number = p.id;
    this.imageService.findAllByProduct(id).subscribe(data => {
      this.listImage = data;
      this.img = this.listImage[this.listImage.length-1].name;
      this.listImage.pop();
      this.product = p;
      this.show = true;
    })
  }

  updateStore(id: number) {
    // @ts-ignore
    this.storeService.updateStoreByUserId(id, this.storeForm.value).subscribe(() => {
      alert("Update Successfully")
      window.location.reload();
    }, error => {
      alert("Something wrong!")
      console.log(error);
    })
  }
  submitImage(event: any){
    if(event.target.files && event.target.files[0]){
      this.imageFile = event.target.files[0];
      if(this.pathName !== this.imageFile.name){
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe(url =>{
              this.path= url
            });
          })
        ).subscribe()
      }
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
          this.store.logo = url;
          this.storeService.updateStoreByUserId(this.userId, this.store).subscribe(() => {
            alert("Update Successfully");
            window.location.reload();
          }, e => {
            alert("Something Wrong")
            console.log(e);
          })
        })
      })
    ).subscribe();
  }
}
