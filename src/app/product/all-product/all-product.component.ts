import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product/product";
import {Image} from "../../model/product/image";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../service/product/image.service";


@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  path!: string
  pathName!: string
  imageFile: any

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  ngOnInit() {
    const id = Number(this.routerActive.snapshot.paramMap.get("id"))
    this.productService.findAllByStore(id).subscribe((data) => {
        this.listProduct = data
      }
    )
    this.formImage = new FormGroup({
      id: new FormControl(''),
      product: new FormGroup({
        id: new FormControl('')
      })
    })

  }

  product !: Product;
  listProduct: Product[] = [];
  listProductMains: Product[] = [];
  listProductDrinks: Product[] = [];
  listImage: Image[] = [];
  image!: Image;
  formImage!: FormGroup
  productId!: number
  imageId!:number
  pathEdit!: string

  onDetailFood(p: Product) {
    this.imageService.findAllByProduct(p.id).subscribe(data => {
      this.listImage = data;

    })
  }

  showImage(id: number) {
    this.productId = id
    this.imageService.findAllByProduct(id).subscribe(data => {
      this.listImage = data;
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
  submitImageEdit(event: any){
    if(event.target.files && event.target.files[0]){
      this.imageFile = event.target.files[0];
      if(this.pathName !== this.imageFile.name){
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe(url =>{
              this.pathEdit= url
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
          this.image.product.id = this.productId
          this.imageService.create(this.image).subscribe()
        });
      })
    ).subscribe()
    this.showImage(this.productId)
    this.path=""
  }
  editImage(id: number){
    const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.image = this.formImage.value
          this.image.id= id
          this.image.name = url
          this.image.product.id = this.productId
          this.imageService.update(this.image, id).subscribe(() => {
          })
          this.pathEdit=""
        });
      })
    ).subscribe()
  }
  deleteImage(id: number){
    this.imageService.deleteById(id).subscribe()
    this.imageService.findAllByProduct(this.productId).subscribe((data)=>{
      this.listImage = data
    })

  }


}
