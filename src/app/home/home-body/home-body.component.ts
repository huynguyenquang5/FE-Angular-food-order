import {Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/service/store/product.service';
import {StoreService} from "../../service/store/store.service";
import {Product} from "../../model/product/product";
import {Store} from "../../model/store/store";
import { ImageService } from 'src/app/service/store/image.service';
import {Image} from "../../model/product/image";

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit{
  products : Product[] = [];
  stores : Store[] = [];
  listImg : Image[] = [];
  ngOnInit(): void {
    this.findAllTopFood()
    this.findAllStore()
    this.findAllStore()
  }
  constructor(private productService: ProductService,
              private storeService: StoreService,
              private imageService: ImageService) {
  }
  findAllProduct(){
    this.productService.findAll().subscribe(data =>{
      this.products = data;
    })
  }
  findAllStore(){
    this.storeService.findAll().subscribe(data =>{
      this.stores = data;
    })
  }
  findAllTopFood(){
    this.imageService.findAllTopFood().subscribe(data =>{
      this.listImg = data;
    })
  }
}
