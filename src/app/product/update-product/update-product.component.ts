import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../service/product/category.service";
import {ProductMethodService} from "../../service/product/product-method.service";
import {Category} from "../../model/product/category";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ImageService} from "../../service/product/image.service";
import {finalize} from "rxjs";
import {Image} from "../../model/product/image";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product!: Product
  formProduct!: FormGroup
  listPath!: string[]
  categories!: Category[]
  formImage!: FormGroup
  path!: string
  pathName!: string
  imageFile: any
  image!: Image
  storeId!: number
  listImage!: Image[]
  productId!: number


  ngOnInit() {
    const id = Number(this.routerActive.snapshot.paramMap.get('id'))
    this.productId = id
    this.formProduct = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])),
      productMethod: new FormGroup({
        id: new FormControl(''),
        price: new FormControl('',Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
        quantity: new FormControl(''),
        description: new FormControl('',Validators.required),
        category: new FormGroup({
          id: new FormControl('')
        })
      }),
      store: new FormGroup({
          id: new FormControl('')
        }
      )
    })
    this.productService.findProduct(id).subscribe(data => {
      this.product = data
      this.formProduct.patchValue(data)
      this.storeId = this.product.store.id
    })
    this.imageService.findAllByProduct(id).subscribe((data) => {
      this.listImage = data
    })
    this.categoryService.findAll().subscribe((data) => {
      this.categories = data
    })

  }

  constructor(private productService: ProductService,
              private storage: AngularFireStorage,
              private router: Router,
              private routerActive: ActivatedRoute,
              private categoryService: CategoryService,
              private productMethodService: ProductMethodService,
              private imageService: ImageService) {


  }

  updateProduct() {
    this.product = this.formProduct.value;
    this.productService.update(this.product, this.product.id).subscribe(
      data => {this.product = data
      this.formProduct.patchValue(data)
        Swal.fire("Update success")
        this.router.navigate(['/merchant/store'])
      }
    )


  }

}
