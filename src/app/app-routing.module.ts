import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailStoreComponent} from "./detail-store/detail-store.component";
import {HomeBodyComponent} from "./home/home-body/home-body.component";
import {AdminPartnerPendingComponent} from "./admin/admin-partner-pending/admin-partner-pending.component";
import {AdminPartnerComponent} from "./admin/admin-partner/admin-partner.component";
import {AdminMerchantPendingComponent} from "./admin/admin-merchant-pending/admin-merchant-pending.component";
import {AdminMerchantComponent} from "./admin/admin-merchant/admin-merchant.component";
import {AdminUserComponent} from "./admin/admin-user/admin-user.component";

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
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
