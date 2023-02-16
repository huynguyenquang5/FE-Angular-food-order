import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { DetailStoreComponent } from './detail-store/detail-store.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeFooterComponent} from './home/home-footer/home-footer.component';
import {HomeHeaderComponent} from './home/home-header/home-header.component';
import {HomeBodyComponent} from './home/home-body/home-body.component';
import {ProductCreateComponent} from "./product/product-create/product-create.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AllProductComponent } from './product/all-product/all-product.component';
import {AdminUserComponent} from "./admin/admin-user/admin-user.component";
import {AdminMerchantComponent} from "./admin/admin-merchant/admin-merchant.component";
import {AdminMerchantPendingComponent} from "./admin/admin-merchant-pending/admin-merchant-pending.component";
import {AdminNavComponent} from "./admin/admin-nav/admin-nav.component";
import {AdminPartnerComponent} from "./admin/admin-partner/admin-partner.component";
import {AdminPartnerPendingComponent} from "./admin/admin-partner-pending/admin-partner-pending.component";
import { HomeFilterComponent } from './home/home-filter/home-filter.component';
import { MerchantStoreComponent } from './merchant/merchant-store/merchant-store.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { MerchantNavComponent } from './merchant/merchant-nav/merchant-nav.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeBodyComponent,
    DetailStoreComponent,
    ProductCreateComponent,
    UpdateProductComponent,
    AllProductComponent,
    AdminUserComponent,
    AdminMerchantComponent,
    AdminMerchantPendingComponent,
    AdminNavComponent,
    AdminPartnerComponent,
    AdminPartnerPendingComponent,
    MerchantStoreComponent,
    HomeFilterComponent,
    MerchantNavComponent,
    DemoComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
