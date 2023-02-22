import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../service/store/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product/product";
import {Image} from "../../model/product/image";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../service/product/image.service";

// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {TokenStorageService} from "../../service/security/token-storage.service";
import {Store} from "../../model/store/store";
import {StoreService} from "../../service/store/store.service";
import {User} from "../../model/user/user";


@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  path!: string
  pathName!: string
  imageFile: any
  storeId!: number;
  store!: Store
  idUser!: number
  user!:User


  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private storeService:StoreService) {
  }

  ngOnInit() {
    this.idUser= this.tokenStorageService.getUser().id
    this.storeService.findByUserId(this.idUser).subscribe(data=>{
      this.store = data
      this.storeId = this.store.id
      this.findAllProduct(this.storeId)
    })

    this.formImage = new FormGroup({
      id: new FormControl(''),
      product: new FormGroup({
        id: new FormControl('')
      })
    })
  }




  product !: Product;
  listProduct: Product[] = [];
  listProducts: Product[] = [];
  listProductMains: Product[] = [];
  listProductDrinks: Product[] = [];
  listImage: Image[] = [];
  image!: Image;
  formImage!: FormGroup
  productId!: number
  imageId!: number
  pathEdit!: string


  onDetailFood(p: Product) {
    this.imageService.findAllByProduct(p.id).subscribe(data => {
      this.listImage = data;
    })
  }

  findAllProduct(id: number) {
    this.productService.findAllByStore(id).subscribe((data) => {
    // this.productService.findAll().subscribe((data) => {
        this.listProduct = data
        this.listProducts = data
      }
    )
  }

  showImage(id: number) {
    this.productId = id
    this.imageService.findAllByProduct(id).subscribe(data => {
      this.listImage = data;
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

  submitImageEdit(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.pathEdit = url
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
    this.path = ""
    Swal.fire(
      "Success"
    )
  }

  editImage(id: number) {
    const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.image = this.formImage.value
          this.image.id = id
          this.image.name = url
          this.image.product.id = this.productId
          this.imageService.update(this.image, id).subscribe(() => {
          })
          this.pathEdit = ""
        });
      })
    ).subscribe()
    this.ngOnInit()
  }

  deleteImage(id: number) {
    this.imageService.deleteById(id).subscribe()
    this.imageService.findAllByProduct(this.productId).subscribe((data) => {
      this.listImage = data
    })
    this.ngOnInit()

  }

  @ViewChild('valueSearch') valueSearch: ElementRef | undefined;
  searchByKeyWord() {
    let value = this.valueSearch?.nativeElement.value
    if (value === "" || value === undefined || value === null) {
      this.listProduct = this.listProducts
    } else {
      let products: Product[] = []
      for (let i = 0; i < this.listProducts.length; i++) {
        if (this.listProducts[i].name.toLowerCase().includes(value.toLowerCase())) {
          products.push(this.listProducts[i])
        }
      }
      this.listProduct = products;
    }
  }

  deleteProduct(p: Product) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    })
    // @ts-ignore
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      backgroundColor: 'white',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        let check: string = ""
        this.imageService.deleteProduct(p.id).subscribe()
        this.findAllProduct(this.storeId);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

}
