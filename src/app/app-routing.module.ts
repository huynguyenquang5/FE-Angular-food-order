import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailStoreComponent} from "./detail-store/detail-store.component";
import {HomeBodyComponent} from "./home/home-body/home-body.component";
import {UpdateProductComponent} from "./product/update-product/update-product.component";
import {AllProductComponent} from "./product/all-product/all-product.component";
import {ProductCreateComponent} from "./product/product-create/product-create.component";

const routes: Routes = [
  {
    path:"", component: HomeBodyComponent
  },
  {
    path: 'store/:storeId',
    component: DetailStoreComponent
  },{
  path:'update/:id',
    component: UpdateProductComponent
  },{
  path:'products/store/:id',
    component: AllProductComponent
  },{
  path:'products/create',
    component: ProductCreateComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
