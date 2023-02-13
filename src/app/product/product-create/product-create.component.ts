import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product/product.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ActivatedRoute, Router} from "@angular/router";
import { finalize } from 'rxjs';
import {Image} from "../../model/product/image";
import {Category} from "../../model/product/category";
import {CategoryService} from "../../service/product/category.service";
import {ProductMethodService} from "../../service/product/product-method.service";
import {ProductMethod} from "../../model/product/product-method";
import {ImageService} from "../../service/product/image.service";

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
  //
  ngOnInit() {
    const id = Number(this.routerActive.snapshot.paramMap.get('id'))
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
              private imageService: ImageService) {
    this.categoryService.findAll().subscribe((data)=>{
      this.categories = data
    })

  }

  createCategory(){
    this.formCategory = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
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
          this.image = this.formImage.value
          this.image.name = url
          this.imageService.save(this.image).subscribe(() => {
          })
        });
      })
    ).subscribe()
  }



}
