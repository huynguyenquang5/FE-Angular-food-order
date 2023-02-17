import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product/product";
import {Category} from "../../model/product/category";
import {ProductService} from "../../service/product/product.service";
import {CategoryService} from "../../service/product/category.service";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit{
  listProduct!: Product[]
  categories!: Category[]
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



}
