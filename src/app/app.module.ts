import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeBodyComponent } from './home/home-body/home-body.component';
import { DetailStoreComponent } from './detail-store/detail-store.component';
import { HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeBodyComponent,
    DetailStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
