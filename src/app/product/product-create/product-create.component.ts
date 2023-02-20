import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product/product.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from 'rxjs';
import {Image} from "../../model/product/image";
import {Category} from "../../model/product/category";
import {CategoryService} from "../../service/product/category.service";
import {ProductMethodService} from "../../service/product/product-method.service";
import {ImageService} from "../../service/product/image.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {StoreService} from "../../service/store/store.service";
import {Store} from "../../model/store/store";
import {User} from "../../model/user/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product!: Product
  formProduct!: FormGroup
  formCategory!: FormGroup
  formProductMethod!: FormGroup
  image!: Image
  categories!: Category[]
  formImage!: FormGroup
  path!: string
  pathName!: string
  imageFile: any
  storeId!: number
  id!: string
  store!: Store
  user!: User

  ngOnInit() {
    this.formImage = new FormGroup({
      id: new FormControl(''),
      product: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        productMethod: new FormGroup({
          id: new FormControl(''),
          price: new FormControl(''),
          quantity: new FormControl(''),
          description: new FormControl(''),
          category: new FormGroup({
            id: new FormControl('')
          })
        }),
        store: new FormGroup({
            id: new FormControl('')
          }
        )
      })
    })
  }

  constructor(private productService: ProductService,
              private storage: AngularFireStorage,
              private router: Router,
              private routerActive: ActivatedRoute,
              private categoryService: CategoryService,
              private productMethodService: ProductMethodService,
              private imageService: ImageService,
              private tokenService: TokenStorageService,
              private storeService: StoreService) {
    this.categoryService.findAll().subscribe((data) => {
      this.categories = data
    })

  }

  submitImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url
            });
          })
        ).subscribe()
      }
    }
  }

  onSubmit() {
    this.user = this.tokenService.getUser()
    this.storeService.findByUserId(this.user.id).subscribe(data => {
      this.store = data
      this.storeId = this.store.id

    })
    const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.image = this.formImage.value
          this.image.name = url
          this.image.product.store.id = this.storeId
          this.imageService.save(this.image).subscribe(() => {
          })
        });
      })
    ).subscribe()
    Swal.fire("Create successfully")
  }
}
