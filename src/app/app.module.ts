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




import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeBodyComponent,
    DetailStoreComponent,
    ProductCreateComponent,
    AllProductComponent

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
