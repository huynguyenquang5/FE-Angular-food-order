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
  listProduct: Product[]=[]
  categories!: Category[]
  listImage: Image[]=[]
  categoryId: number =0
  path!: string
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private imageService: ImageService) {

  }
  ngOnInit()  {
    this.productService.findAll().subscribe((data)=>{
      for (let i =0; i<data.length; i++){
        if (data[i].status!=0){
          this.listProduct.push(data[i])
        }
      }
    })
    this.categoryService.findAll().subscribe((data)=>{
      this.categories = data
    })
    this.imageService.findAllFilter().subscribe((data)=>{
      for (let i =0; i<data.length; i++){
        if (data[i].product.status!=0){
          this.listImage.push(data[i])
        }
      }
    })
  }
  filter(event: Event){
    let id =  parseInt((event.target as HTMLSelectElement).value)
    if (id == 0 || id == null){
      this.imageService.findAllFilter().subscribe((data)=>{
         let listImages: Image[]=[]
        for (let i =0; i<data.length; i++){
          if (data[i].product.status!=0){
           listImages.push(data[i])
          }
        }
        this.listImage = listImages
      })
    }
    this.imageService.findAllByCategoryId(id).subscribe((data)=>{
      let listImages: Image[]=[]
      for (let i =0; i<data.length; i++){
        if (data[i].product.status!=0){
          listImages.push(data[i])
        }
      }
      this.listImage = listImages
    })
  }
  search(event: Event){
    let name = (<HTMLSelectElement> (event.target)).value
    if(name == "" || name == null){
      this.imageService.findAllFilter().subscribe(data =>{

        let listImages: Image[]=[]
        for (let i =0; i<data.length; i++){
          if (data[i].product.status!=0){
            listImages.push(data[i])
          }
        }
        this.listImage = listImages
      })
    }else{this.imageService.findAllByProductName(name).subscribe((data)=>{
      let listImages: Image[]=[]
      for (let i =0; i<data.length; i++){
        if (data[i].product.status!=0){
          listImages.push(data[i])
        }
      }
      this.listImage = listImages
    })}
  }

}
