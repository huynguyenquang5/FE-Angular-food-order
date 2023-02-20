import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {Category} from "../../model/product/category";
import {ProductService} from "../../service/product/product.service";
import {CategoryService} from "../../service/product/category.service";
import {FormGroup} from "@angular/forms";
import {ImageService} from "../../service/product/image.service";
import {Image} from "../../model/product/image";
import {databaseInstance$} from "@angular/fire/database";

@Component({
  selector: 'app-admin-product',
  templateUrl: './viewer-product.component.html',
  styleUrls: ['./viewer-product.component.css']
})
export class ViewerProductComponent implements OnInit{
  listProduct!: Product[]
  categories!: Category[]
  listImage!: Image[]
  categoryId: number =0
  path!: string
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private imageService: ImageService) {

  }
  ngOnInit()  {
    this.productService.findAll().subscribe((data)=>{
      this.listProduct = data
    })
    this.categoryService.findAll().subscribe((data)=>{
      this.categories = data
    })
    this.imageService.findAllFilter().subscribe((data)=>{
      this.listImage = data
    })
  }
  filter(id: number){
    if (id == 0 || id == null){
      this.imageService.findAllFilter().subscribe((data)=>{
        this.listImage = data
      })
    }
    this.imageService.findAllByCategoryId(id).subscribe((data)=>{
      this.listImage = data;
    })
  }
  search(event: Event){
    let name = (<HTMLSelectElement> (event.target)).value
    if(name == "" || name == null){
      this.imageService.findAllFilter().subscribe(data =>{
        this.listImage = data
      })
    }else{this.imageService.findAllByProductName(name).subscribe((data)=>{
      this.listImage = data
    })}
  }

}
