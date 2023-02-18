import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {Category} from "../../model/product/category";
import {ProductService} from "../../service/product/product.service";
import {CategoryService} from "../../service/product/category.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit{
  listProduct!: Product[]
  categories!: Category[]
  categoryId!: number
  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }
  ngOnInit()  {
    this.productService.findAll().subscribe((data)=>{
      this.listProduct = data
    })
    this.categoryService.findAll().subscribe((data)=>{
      this.categories = data
    })
  }
  filter(event: Event){
    let id =  parseInt((event.target as HTMLSelectElement).value)
    if (id == 0 || id == null){
      this.productService.findAll().subscribe((data)=>{
        this.listProduct = data
      })
    }
    this.productService.findAllByCategoriesId(id).subscribe((data)=>{
      this.listProduct = data;
    })
  }
  search(event: Event){
    let name = (<HTMLSelectElement> (event.target)).value
    if(name == "" || name == null){
      this.productService.findAll().subscribe(data =>{
        this.listProduct = data
      })
    }else{this.productService.findAllByName(name).subscribe((data)=>{
      this.listProduct = data
    })}
  }
}
