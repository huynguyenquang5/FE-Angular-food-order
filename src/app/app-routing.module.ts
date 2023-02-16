import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailStoreComponent} from "./detail-store/detail-store.component";
import {HomeBodyComponent} from "./home/home-body/home-body.component";
import {UpdateProductComponent} from "./product/update-product/update-product.component";
import {AllProductComponent} from "./product/all-product/all-product.component";
import {ProductCreateComponent} from "./product/product-create/product-create.component";
import {AdminUserComponent} from "./admin/admin-user/admin-user.component";
import {AdminMerchantComponent} from "./admin/admin-merchant/admin-merchant.component";
import {AdminMerchantPendingComponent} from "./admin/admin-merchant-pending/admin-merchant-pending.component";
import {AdminPartnerComponent} from "./admin/admin-partner/admin-partner.component";
import {AdminPartnerPendingComponent} from "./admin/admin-partner-pending/admin-partner-pending.component";

import {MerchantStoreComponent} from "./merchant/merchant-store/merchant-store.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminUserComponent
  },
  {
    path: 'admin/merchant',
    component: AdminMerchantComponent
  },
  {
    path: 'admin/merchant_pending',
    component: AdminMerchantPendingComponent
  },
  {
    path: 'admin/partner',
    component: AdminPartnerComponent
  },
  {
    path: 'admin/partner_pending',
    component: AdminPartnerPendingComponent
  },
  {
    path:"", component: HomeBodyComponent
  },
  {
    path: 'store/:storeId',
    component: DetailStoreComponent
  },
  {
    path: 'store/user/:userId',
    component: MerchantStoreComponent
  },{
  path:'update/:id',
    component: UpdateProductComponent
  },{
  path:'products/store/:id',
    component: AllProductComponent
  },{
  path:'products/create/:id',
    component: ProductCreateComponent
  },{
  path: 'login',
    component: LoginComponent
  },{
  path: 'register',
    component: RegisterComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
