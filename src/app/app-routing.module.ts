import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailStoreComponent} from "./product/detail-store/detail-store.component";
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
import {MerchantDetailComponent} from "./merchant/merchant-detail/merchant-detail.component";
import {ViewerProductComponent} from "./product/viewer-product/viewer-product.component";
import {OrderComponent} from "./cart/order/order.component";
import {ListOrderComponent} from "./user/list-order/list-order.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {PaymentDetailComponent} from "./cart/payment-detail/payment-detail.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminUserComponent
  },
  {
    path: 'order/store/:storeId',
    component: OrderComponent
  },
  {
    path: 'list-order/user/:userId',
    component: ListOrderComponent
  },
  {
    path: 'user/payment-detail/payment/:paymentId',
    component: PaymentDetailComponent
  },
  {
    path: 'detail/user',
    component: UserDetailComponent
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
    path: "", component: HomeBodyComponent
  },
  {
    path: 'store/:id',
    component: DetailStoreComponent
  },
  {
    path: 'store/merchant',
    component: MerchantStoreComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent
  },
  {
    path: 'product',
    component: AllProductComponent
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent
  },
  {
    path: 'products/store/:id',
    component: AllProductComponent
  },{
    path: 'products/create/:id',
    component: ProductCreateComponent
  },{
  path: 'accounts/login',
    component: LoginComponent
  },{
  path: 'accounts/register',
    component: RegisterComponent
  }
  ,
  {
    path: 'users/merchant',
    component: MerchantDetailComponent
  },
  {
    path: 'view',
    component: ViewerProductComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
