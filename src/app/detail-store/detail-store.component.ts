import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {ActivatedRoute} from "@angular/router";
import { Product } from '../model/product/product';
import {FormControl, FormGroup} from "@angular/forms";
import {Image} from "../model/product/image";
import {ImageService} from "../service/image.service";
import { StoreService } from '../service/store.service';
import {Store} from "../model/store/store";


@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent implements OnInit {
  show : boolean = false;
  ngOnInit(): void {
    const id = Number(this.routerActive.snapshot.paramMap.get("id"))
    this.storeService.findById(1).subscribe(data => {
      this.store = data
    })
    this.productService.findAllByStore(id).subscribe(data =>{
      this.listProduct = data;
      this.classify(data);
      this.product = this.listProduct[0];
    })
    console.log(this.store)
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,
              private storeService: StoreService) {
  }
  listProduct : Product[] = [];
  listProductMains : Product[] = [];
  listProductDrinks : Product[] = [];
  listImage : Image[] = [];
  classify(products : Product[]){
    for (let i = 0; i < products.length; i++) {
      if (products[i].productMethod.category.name.toUpperCase() !== "DRINK"){
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
}
