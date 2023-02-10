import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {ActivatedRoute} from "@angular/router";
import { Product } from '../model/product/product';
import {FormControl, FormGroup} from "@angular/forms";
import {Image} from "../model/product/image";
import {ImageService} from "../service/image.service";


@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent implements OnInit {
  ngOnInit(): void {
    const id = Number(this.routerActive.snapshot.paramMap.get("id"))
    this.productService.findAllByStore(id).subscribe(data =>{
      this.listProduct = data;
      this.classify(data)
      console.log(this.listProductMains)
    })
  }

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private routerActive : ActivatedRoute,) {
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
  onDetailFood(p: Product) {
    let id :number = p.id;
    this.imageService.findAllByProduct(id).subscribe(data => {
      this.listImage = data;
      this.product = p;
    })
  }
}
